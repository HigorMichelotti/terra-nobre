import Swal from 'sweetalert2';

export class EmitirAlerta {
    msg: any;


    public static AlertaToastSuccess(msg?: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top',
            customClass: {
                container: 'alertaToastNotificacaoTop',
                popup: 'popup-swall-custom-success',
                icon: 'icon-swall-custom-success',
                title: 'title-swall-white-success',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        })

        Toast.fire({
            icon: 'success',
            title: msg || "Solicitação processada com sucesso!",
        })
    }

    public static AlertaToastError(msg?: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top',
            customClass: {
                container: 'alertaToastNotificacaoTop',
                popup: 'popup-swall-custom-error',
                icon: 'icon-swall-custom-error',
                title: 'title-swall-white-error',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            iconHtml: '<img src="./assets/img/sad.png" style="width: 32px !important"  />',
            title: msg|| 'Ops. Algo deu errado, tente novamente.',
        })
    }

    public static AlertaToastNotificacao(msg: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top',
            showConfirmButton: false,
            timer: 3000,
        })

        Toast.fire({
            icon: 'warning',
            title: msg
        })

    }
}
