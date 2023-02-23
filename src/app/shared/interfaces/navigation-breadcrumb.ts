export interface NavigationBreadcrumbItem {
    texto?: string,
    link?: string
}

export interface NavigationBreadcrumb {
    setarBreadcrumb(): NavigationBreadcrumbItem[]
}
