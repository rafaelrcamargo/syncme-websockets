export const useChangeTheme = theme => {
    const paths = document.querySelectorAll('.qr-home path');
    const dark = document.querySelectorAll('.qr-home path')[0].getAttribute('fill')
    const light = document.querySelectorAll('.qr-home path')[7].getAttribute('fill')

    if (theme === "classic") {
        for (let i = 0; i < paths.length; i++) {
            if (document.querySelectorAll('.qr-home path')[i].getAttribute('fill') === dark) {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', '#262523')
            } else if (document.querySelectorAll('.qr-home path')[i].getAttribute('fill') === light) {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', '#f5e7d5')
            }
        }
        document.documentElement.style.setProperty('--clr-neutral-900', '#262523');
        document.documentElement.style.setProperty('--clr-neutral-100', '#f5e7d5');
        document.documentElement.style.setProperty('--font-family', `'Playfair Display', serif`);
    }
    if (theme === "modern") {
        for (let i = 0; i < paths.length; i++) {
            if (document.querySelectorAll('.qr-home path')[i].getAttribute('fill') === dark) {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', '#F2B84B')
            } else {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', '#1d2a36')
            }
        }
        document.documentElement.style.setProperty('--clr-neutral-900', '#F2B84B');
        document.documentElement.style.setProperty('--clr-neutral-100', '#1d2a36');
        document.documentElement.style.setProperty('--font-family', `'Lato', serif`);
    }
    if (theme === "unknown") {
        const randomDark = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        const randomLight = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        for (let i = 0; i < paths.length; i++) {
            if (document.querySelectorAll('.qr-home path')[i].getAttribute('fill') === dark) {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', randomDark)
            } else {
                document.querySelectorAll('.qr-home path')[i].setAttribute('fill', randomLight)
            }
        }
        document.documentElement.style.setProperty('--clr-neutral-900', randomDark);
        document.documentElement.style.setProperty('--clr-neutral-100', randomLight);
        if(Math.round(Math.random())) {
            document.documentElement.style.setProperty('--font-family', `'Playfair Display', serif`);
        } else {
            document.documentElement.style.setProperty('--font-family', `'Lato', serif`);
        }
    }
}