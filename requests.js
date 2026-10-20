(() => {
  document.querySelectorAll('.request-form').forEach(form => {
    const phone = form.querySelector('[name="Телефон"]');
    const error = form.querySelector('.request-error');
    const validate = () => {
      const value = phone.value.trim();
      const digits = value.replace(/\D/g, '');
      const valid = /^[+\d\s()\-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
      phone.setCustomValidity(valid ? '' : 'Введите номер телефона: от 10 до 15 цифр.');
    };
    phone.addEventListener('input', validate);
    form.addEventListener('submit', event => {
      validate();
      if (!form.reportValidity()) { event.preventDefault(); return; }
      if (navigator.onLine === false) {
        event.preventDefault(); error.hidden = false;
        error.textContent = 'Нет подключения к интернету. Проверьте соединение и попробуйте ещё раз.';
        return;
      }
      error.hidden = true;
      // Native POST: the provider owns CAPTCHA, activation, and the actual submission result.
      // No local success state or message is shown before a provider response.
    });
  });
})();
