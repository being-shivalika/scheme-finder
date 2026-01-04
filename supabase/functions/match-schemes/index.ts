import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userProfile, schemes } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing scheme matching for user:", userProfile);

    const systemPrompt = `You are an expert on Indian government schemes and policies. Your role is to analyze a user's profile and match them with relevant government schemes they are eligible for.

For each scheme, you should:
1. Determine if the user is likely eligible based on their profile
2. Assign an eligibility score from 0-100 (100 = definitely eligible, 0 = not eligible)
3. Provide a brief reason for the match

Be helpful and encouraging. Many Indians miss out on beneficial schemes simply because they don't know about them.

Respond in JSON format with:
{
  "matchedSchemes": [
    {
      "schemeId": "string",
      "eligibilityScore": number,
      "matchReason": "string explaining why this scheme matches the user"
    }
  ],
  "summary": "A friendly 2-3 sentence summary of the best opportunities for this user"
}

Only include schemes with eligibility score >= 40.`;

    const userMessage = `Here is the user's profile:
- Age: ${userProfile.age} years
- Gender: ${userProfile.gender}
- State: ${userProfile.state}
- Category: ${userProfile.category} (General/SC/ST/OBC)
- Annual Income: ₹${userProfile.income.toLocaleString('en-IN')}
- Occupation: ${userProfile.occupation}
- Education: ${userProfile.education}
- Is Person with Disability: ${userProfile.isDisabled ? 'Yes' : 'No'}
- Is from Minority Community: ${userProfile.isMinority ? 'Yes' : 'No'}
- Is Below Poverty Line (BPL): ${userProfile.isBPL ? 'Yes' : 'No'}

Here are the available government schemes to match against:
${JSON.stringify(schemes.map((s: { id: string; name: string; category: string; eligibility: string[]; description: string }) => ({
  id: s.id,
  name: s.name,
  category: s.category,
  eligibility: s.eligibility,
  description: s.description
})), null, 2)}

Please analyze and match the user with eligible schemes.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI Response:", content);

    // Parse the JSON response from the AI
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return a default response
      result = {
        matchedSchemes: schemes.slice(0, 5).map((s: { id: string }) => ({
          schemeId: s.id,
          eligibilityScore: 70,
          matchReason: "This scheme may be relevant based on your profile."
        })),
        summary: "Based on your profile, we found several government schemes that might benefit you. Please review the details to confirm your eligibility."
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in match-schemes function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
