/**
 * Created by pacman29 on 22.02.17.
 */
(function () {
    window.Footer = function Footer(opt) {
        let footer = document.createElement('footer');
        footer.setAttribute('class', 'text-center footer');
        footer.innerHTML = template({_css: opt.class, text: opt.text});
        return footer;
    };
}());
