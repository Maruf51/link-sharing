export interface LinkTypes {
    platform: string;
    link: string;
}

export interface UserTypes {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    image: string,
    uid: string,
    access: string,
    links: LinkTypes[],
    saved: string[]
}

export interface InputFieldDataTypes {
    label: string, 
    name: string, 
    type: 'text' | 'password' | 'email' | 'number', 
    placeholder: string,
    defaultValue?: string,
    value?: string
}