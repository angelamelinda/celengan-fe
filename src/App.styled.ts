import styled, { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants';

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: 'Lato', sans-serif;
        background: #F5F5F5;
    }

    *, :before, :after {
        box-sizing: border-box;
    }

    a {
        color: ${COLOR.PRIMARY};
        text-decoration: none;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            opacity: .6;
        }
    }
`;

export const AppContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 600px;
    min-height: 100vh;
    background: ${COLOR.WHITE}
`