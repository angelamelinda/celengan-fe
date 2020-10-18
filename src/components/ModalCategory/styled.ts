import styled from "styled-components"
import { COLOR } from "../../constants"

export const ModalWrapper = styled.div`
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, .5);
`

export const ModalWrapperContent = styled.div`
    position: relative;
    z-index: 1;
    background: #fff;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
`

export const ModalHeader = styled.div`
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
`

export const ModalBody = styled.div``

export const ModalContent = styled.div`
    padding: 15px;
    display: flex;
`

export const ModalFooter = styled.div`
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    
    > div {
        user-select: none;
    }
`

export const ModalFooterConfirm = styled.div`
    margin-left: 20px;
    color: ${COLOR.PRIMARY};
    cursor: pointer;
 
`

export const ModalFooterCancel = styled.div`
    opacity: .8;
    cursor: pointer;
`

export const ModalContentIcon = styled.div`
    width: 40px;
    height: 40px;
    background: ${COLOR.PRIMARY};
    border-radius: 100%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLOR.WHITE};
    fill: ${COLOR.WHITE};
    font-size: calc(20 / 16 * 1rem);
    font-weight: 700;
    cursor: pointer;
    user-select: none;
`

export const ModalContentInput = styled.div`
    width: calc(100% - 50px);

    input {
        margin-bottom: 0;
    }
`