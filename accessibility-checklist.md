# ConsejoSeguro Accessibility Checklist

This checklist is used to ensure the ConsejoSeguro app meets accessibility standards (WCAG 2.1 AA). Review and check off each item before deployment.

## 1. Perceivable
- [ ] Text alternatives for all non-text content (images, icons, buttons)
- [ ] Captions and transcripts for multimedia
- [ ] Content is adaptable and can be presented in different ways
- [ ] Sufficient color contrast (minimum 4.5:1 for normal text)
- [ ] Text is resizable up to 200% without loss of content/function

## 2. Operable
- [ ] All functionality is available from a keyboard
- [ ] No keyboard traps (user can navigate away from all elements)
- [ ] Sufficient time for users to read and use content
- [ ] No content flashes more than three times per second
- [ ] Navigation is consistent and logical
- [ ] Breadcrumbs and skip links are present

## 3. Understandable
- [ ] Text is readable and understandable
- [ ] Web pages appear and operate in predictable ways
- [ ] Input assistance is provided for forms and errors

## 4. Robust
- [ ] Markup is valid and semantic (use of ARIA where needed)
- [ ] App works with assistive technologies (screen readers, etc.)

## 5. Automated Testing
- [ ] Lighthouse CI passes accessibility checks (score ≥ 95)
- [ ] axe-core or similar automated tools pass with no critical issues

---

**Last reviewed:** <!-- date -->
**Reviewed by:** <!-- name -->
