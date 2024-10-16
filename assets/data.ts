import { FaFacebookSquare, FaGithub, FaInstagramSquare, FaLinkedin, FaYoutube } from "react-icons/fa";

const register_form_data = [
    {
        name: 'username',
        label: 'Username (unique)',
        placeholder: 'Username...',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email...',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password...',
        type: 'password',
    }
];

const signin_form_data = [
    {
        name: 'username',
        label: 'Username',
        placeholder: 'Username...',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Password...',
        type: 'password',
    },
];

const platforms = {
    all: ['github', 'linkedin', 'youtube', 'facebook', 'instagram'],
    github: {
        name: 'GitHub',
        icon: FaGithub,
        color: '#191919'
    },
    facebook: {
        name: 'Facebook',
        icon: FaFacebookSquare,
        color: '#1877F2'
    },
    youtube: {
        name: 'YouTube',
        icon: FaYoutube,
        color: '#FF0000'
    },
    linkedin: {
        name: 'LinkedIn',
        icon: FaLinkedin,
        color: '#0077B5'
    },
    instagram: {
        name: 'Instagram',
        icon: FaInstagramSquare,
        color: '#C13584'
    }
}

export {
    signin_form_data,
    register_form_data,
    platforms
}