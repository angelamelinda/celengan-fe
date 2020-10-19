import styled from "styled-components";
import { COLOR } from "../../constants";

export const BottomNavigationWrapper = styled.div`
    position: fixed;
    bottom: 0;
    background: ${COLOR.WHITE};
    display: block;
    left: 50%;
    max-width: 600px;
    width: 100%;
    transform: translateX(-50%);
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .bottom-nav-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;

        &.center {
            width: 40px;
            height: 40px;
            background: ${COLOR.PRIMARY};
            border-radius: 100%;
            color: ${COLOR.WHITE};
            font-size: 25px;
            box-shadow: 0 4px 8px rgba(0,0,0,.6);
        }
    }
`

export const BottomNavigationItemIcon = styled.div`
    svg path {
        color: #00a201;
        stroke: #00a201!important;
    }
`

export const BottomNavigationItemName = styled.div`
    color: #000;
    opacity: .6;
`