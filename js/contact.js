// Validation et soumission du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const statusEl = document.getElementById('formStatus');

    function setStatus(message, type = 'info') {
        statusEl.textContent = message;
        statusEl.classList.remove('success', 'error');
        if (type === 'success') statusEl.classList.add('success');
        if (type === 'error') statusEl.classList.add('error');
    }

    function clearErrors() {
        form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    }

    function validate() {
        clearErrors();
        let valid = true;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name.length < 2) {
            form.querySelector('#name + .field-error').textContent = 'Veuillez entrer au moins 2 caractères.';
            valid = false;
        }

        // simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            form.querySelector('#email + .field-error').textContent = 'Adresse email invalide.';
            valid = false;
        }

        if (message.length < 10) {
            form.querySelector('#message + .field-error').textContent = 'Veuillez entrer au moins 10 caractères.';
            valid = false;
        }

        return valid;
    }

    form.addEventListener('submit', async function(ev) {
        ev.preventDefault();
        setStatus('Validation...', 'info');

        if (!validate()) {
            setStatus('Corrigez les erreurs dans le formulaire.', 'error');
            return;
        }

        const endpoint = form.getAttribute('data-endpoint');
        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        if (endpoint) {
            setStatus('Envoi en cours...', 'info');
            try {
                const resp = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (resp.ok) {
                    setStatus('Message envoyé. Merci !', 'success');
                    form.reset();
                } else {
                    const t = await resp.text();
                    setStatus('Erreur lors de l\'envoi : ' + (t || resp.statusText), 'error');
                }
            } catch (err) {
                setStatus('Impossible de contacter le serveur : ' + err.message, 'error');
            }
            return;
        }

        // fallback mailto
        const mailto = `mailto:rayane.tbatou01@gmail.com?subject=${encodeURIComponent('Message depuis portfolio')}&body=${encodeURIComponent('Nom: ' + payload.name + '\n\n' + payload.message + '\n\nEmail: ' + payload.email)}`;
        window.location.href = mailto;
        setStatus('Votre client mail devrait s\'ouvrir. Si rien ne se passe, envoyez un email à rayane.tbatou01@gmail.com', 'success');
        form.reset();
    });
});
