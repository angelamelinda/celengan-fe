import styled from "styled-components";
import { COLOR } from "../../constants";

export const LogoWrapper = styled.div`
    position: relative;
`

export const LogoAppName = styled.div`
    font-size: calc(32 / 16 * 1rem);
    text-transform: uppercase;
    font-weight: 900;
    color: ${COLOR.PRIMARY};
    letter-spacing: 4px;
    position: relative;
    padding-left: 46px;
    padding-bottom: 20px;

    span {
        font-size: calc(64 / 16 * 1rem);
        position: absolute;
        left: 0;
        top: -16px;
    }
`

export const LogoSlogan = styled.div`
    font-size: calc(12 / 16 * 1rem);
    position: absolute;
    bottom: 10px;
    right: 6px;
    letter-spacing: .5px;
`