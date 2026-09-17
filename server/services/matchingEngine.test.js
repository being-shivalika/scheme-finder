import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateRules } from './matchingEngine.js';

describe('evaluateRules', () => {
  it('marks schemes without rules as needs_verification with unknown confidence', () => {
    const result = evaluateRules(
      { id: 'x', name: 'No Rules', eligibilityRulesVerified: false },
      { age: 30 }
    );
    assert.equal(result.matchStatus, 'needs_verification');
    assert.equal(result.confidence, 'unknown');
  });

  it('returns eligible when verified rules match', () => {
    const scheme = {
      id: 'pmay',
      eligibilityRulesVerified: true,
      eligibilityRules: {
        operator: 'AND',
        conditions: [{ field: 'income', operator: '<=', value: 1800000 }],
      },
    };
    const result = evaluateRules(scheme, { income: 500000 });
    assert.equal(result.matchStatus, 'eligible');
  });

  it('returns not_eligible when income exceeds limit', () => {
    const scheme = {
      id: 'pmay',
      eligibilityRulesVerified: true,
      eligibilityRules: {
        operator: 'AND',
        conditions: [{ field: 'income', operator: '<=', value: 1800000 }],
      },
    };
    const result = evaluateRules(scheme, { income: 2000000 });
    assert.equal(result.matchStatus, 'not_eligible');
  });

  it('matches IN operators case-insensitively', () => {
    const scheme = {
      id: 'cat',
      eligibilityRulesVerified: true,
      eligibilityRules: {
        operator: 'AND',
        conditions: [{ field: 'category', operator: 'IN', value: ['sc', 'st'] }],
      },
    };
    const result = evaluateRules(scheme, { category: 'SC' });
    assert.equal(result.matchStatus, 'eligible');
  });

  it('prefers not_eligible over needs_verification when a hard rule fails', () => {
    const scheme = {
      id: 'combo',
      eligibilityRulesVerified: true,
      eligibilityRules: {
        operator: 'AND',
        conditions: [
          { field: 'income', operator: '<=', value: 100000 },
          { field: 'state', operator: '=', value: 'Delhi' },
        ],
      },
    };
    const result = evaluateRules(scheme, { income: 500000 });
    assert.equal(result.matchStatus, 'not_eligible');
  });
});
