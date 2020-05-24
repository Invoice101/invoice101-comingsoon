document.addEventListener('DOMContentLoaded', (event) => {
    const emailInput = document.querySelector('#emailInput');
    const submitButton = document.querySelector('#notifyBtn');
    const emailForm = document.querySelector('#emailForm');

    emailForm.addEventListener('submit', ($event) => {
        $event.preventDefault();
    });

    submitButton.addEventListener('click', () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(emailInput.value).toLowerCase())) {
            return;
        }
        submitEmail(emailInput.value);
    });

    const submitEmail = async (email) => {
        const postURL = 'https://invoice101.in/api/beta/subscription/';
        // const postURL = 'http://localhost:8000/api/beta/subscription/';
        const result = await fetch(postURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });

        if (result.status === 201) {
            Swal.fire({
                title: 'Subscribed!',
                icon: 'success',
                text: "Thank for signing up. You will be the first to know about new releases and special offers. Stay Tuned.",
                confirmButtonText: 'Cool'
            });
        }

        if (result.status === 400) {
            const data = await result.json();
            const keys = Object.keys(data);

            Swal.fire({
                title: 'Hmm,',
                icon: 'warning',
                text: data[keys[0]][0],
                confirmButtonText: 'Cool'
            });
        }


    }
});
