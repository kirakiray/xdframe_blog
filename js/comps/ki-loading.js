drill.define(async (load) => {
    $.register({
        tag: "ki-loading",
        data: {
            color: "#000000"
        },
        watch: {
            color(e, val) {
                this.queShadow("circle").attr("stroke", val)
            }
        },
        temp: `
        <style>
        :host{
            display:inline-block;
        }
        .uk-spinner{
            display:inline-block;
        }
        .uk-spinner>* {
            animation: uk-spinner-rotate 1.4s linear infinite
        }

        @keyframes uk-spinner-rotate {
            0% {
                transform: rotate(0deg)
            }

            100% {
                transform: rotate(270deg)
            }
        }

        .uk-spinner>*>* {
            stroke-dasharray: 88px;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: uk-spinner-dash 1.4s ease-in-out infinite;
            stroke-width: 1;
            stroke-linecap: round
        }

        @keyframes uk-spinner-dash {
            0% {
                stroke-dashoffset: 88px
            }

            50% {
                stroke-dashoffset: 22px;
                transform: rotate(135deg)
            }

            100% {
                stroke-dashoffset: 88px;
                transform: rotate(450deg)
            }
        }
        </style>
        <span uk-spinner class="uk-spinner">
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" data-svg="spinner">
                <circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle>
            </svg>
        </span>
        `
    });
});