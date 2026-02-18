# CIRIS Accord Terminology Standardization Notes

## Current State (Pre-Standardization)

### File Structure
- Files: `v1.mdx` through `v9.mdx` in `content/docs/main/` and `content/sections/main/`

### Terminology Inconsistencies Identified

#### Sections I-V (v1.mdx - v5.mdx)
- **Title**: "Section I" through "Section V"
- **Body text**: Consistently uses "Section" terminology
- **Status**: ✅ Internally consistent

#### Sections VI-VIII (v6.mdx - v8.mdx)
- **Title**: "Section VI" through "Section VIII"
- **Body text**: Uses **"Book"** terminology
  - v6.mdx line 8: "Book VI extends this framework..."
  - v6.mdx line 143: "End of Book VI"
  - v8.mdx line 8: References "Book VI" and "Book VII"
  - v8.mdx line 77: "feeds Book II resilience loop"
  - v8.mdx line 102: "End of Book VIII"
- **Status**: ⚠️ Title/body mismatch

#### Section IX (v9.mdx) - NEW
- **Title**: "Section IX" (following established title pattern)
- **Body text**: Uses "Book IX" (following v6-v8 body pattern)
- **Rationale**: Maintains consistency with recent sections while preserving title convention

### External References

#### Issue #566 (Federated Ratchet)
- Uses: "Book IX: The Mathematics of Coherence"
- Aligns with body text convention (v6-v8)

#### PR #188 (TheLightFramework)
- Uses: "Section II, Chapter 2" and "Section II, Chapter 4"
- Aligns with title convention AND v2.mdx internal structure
- Note: v2.mdx contains subsections confusingly labeled "Section I", "Section II", etc. within "Section II"

## Recommendations for Future Standardization

### Option A: Standardize to "Section" throughout
- Update v6-v8 body text to use "Section" instead of "Book"
- Pro: Matches title metadata and v1-v5 pattern
- Pro: Aligns with fumadocs navigation structure
- Con: Requires editing existing content

### Option B: Standardize to "Book" throughout
- Update v1-v5 to use "Book" in body text
- Update all titles to "Book I" through "Book IX"
- Pro: More traditional religious/philosophical text convention (matches "Accord" framing)
- Con: Larger scope of changes required

### Option C: Hybrid (Current State)
- Keep as-is with documentation
- Pro: No immediate changes required
- Con: Confusing for new contributors

## Recommended Action

**Adopt Option A** for the following reasons:
1. Minimal disruption (only affects 3 files: v6, v7, v8)
2. Maintains consistency with navigation metadata
3. "Section" is more appropriate for technical documentation
4. Easier to reference in cross-links ("see Section II" vs "see Book II")

### Specific Changes Required for Option A:
```
v6.mdx: "Book VI" → "Section VI" (body text, ~4 occurrences)
v7.mdx: "this book" → "this section" (body text, ~2 occurrences)
v8.mdx: "Book VI", "Book VII", "Book VIII", "Book II" → "Section VI", etc. (~5 occurrences)
```

## Integration Notes

### v2.mdx Internal Structure Issue
Section II (v2.mdx) contains subsections named:
- "Section I: Principles into Practice"
- "Section II: Ethical Decision-Making Process"
- "Section III: Wisdom-Based Deferral"
- etc.

This creates ambiguity. Recommend renaming to:
- "§II.1: Principles into Practice"
- "§II.2: Ethical Decision-Making Process"
- "§II.3: Wisdom-Based Deferral"
- etc.

Or simply:
- "Subsection 1: Principles into Practice"
- "Subsection 2: Ethical Decision-Making Process"
- etc.

---

**Document Created**: 2025-01-02
**Author**: Claude Code review session
**Related Issues**: #566 (Federated Ratchet)
**Related PRs**: #188 (TheLightFramework thermodynamic constraints)
