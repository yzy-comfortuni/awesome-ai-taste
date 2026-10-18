/** Shared pending/error handling for the sign-in and account controls. */
export function bindAuthActions(
  container: HTMLElement | null,
  action: (button: HTMLButtonElement) => Promise<void>,
  errorMessage: string,
) {
  if (!container) return;

  const buttons = container.querySelectorAll<HTMLButtonElement>("button");
  const error = container.querySelector<HTMLElement>("[data-auth-error]");
  let pending = false;

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (pending || button.disabled) return;
      pending = true;
      const disabledStates = Array.from(buttons, (entry) => entry.disabled);
      buttons.forEach((entry) => {
        entry.disabled = true;
      });
      button.setAttribute("aria-busy", "true");
      if (error) error.hidden = true;

      try {
        await action(button);
      } catch {
        // Never render provider errors, URLs, or tokens into the page.
        if (error) {
          error.textContent = errorMessage;
          error.hidden = false;
        }
      } finally {
        buttons.forEach((entry, index) => {
          entry.disabled = disabledStates[index];
        });
        button.removeAttribute("aria-busy");
        pending = false;
      }
    });
  });
}
