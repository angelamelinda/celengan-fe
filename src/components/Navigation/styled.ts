import styled from "styled-components";

export const NavigationWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0;
    height: 50px;
    position: relative;
`

export const NavigationBack = styled.div`
    font-size: 28px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const NavigationTitle = styled.div`
    padding: 15px 25px 15px 5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
`

export const NavigationAdd = styled.div`
    position: absolute;
    right: 10px;
    font-size: calc(30 / 16 * 1rem);
    width: 30px;
    height: 30px;
`