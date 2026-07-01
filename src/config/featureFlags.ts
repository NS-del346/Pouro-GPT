/**
 * Compile-time rollout controls.
 *
 * PR-AB-00 establishes the flag boundary only. Production components must not
 * import this flag until a later Human Gate explicitly authorizes integration.
 */
export const ACTIVE_BREW_REFERENCE_ENABLED = false as const;
