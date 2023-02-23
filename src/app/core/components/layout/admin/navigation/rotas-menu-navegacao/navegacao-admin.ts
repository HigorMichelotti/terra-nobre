export const NavegacaoAdministracao = {
    id: 'menu-nav',
    title: 'MENU',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
         {
            id: 'menu-propostas',
            title: 'Propostas',
            type: 'collapse',
            icon: 'fas fa-file-signature',
            children: [
                {
                    id: 'protosta-venda',
                    title: 'Venda de imóveis',
                    type: 'item',
                    url: '/admin/propostas',
                },
            ]
        },
       
        // {
        //     id: 'menu-administracao',
        //     title: 'Administração',
        //     type: 'collapse',
        //     icon: 'fa fa-user',
        //     claimRequired: ['Usuario.Ler'],
        //     children: [
        //         {
        //             id: 'admin-usuarios',
        //             title: 'Usuarios',
        //             type: 'item',
        //             url: '/admin/usuarios',
        //             claimRequired: 'Usuario.Ler',
        //         }
        //     ]
        // },

    ]
}