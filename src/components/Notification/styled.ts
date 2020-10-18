import styled from "styled-components";

export const NotificationWrapper = styled.div`
    position: fixed;
    bottom: 10px;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    padding: 15px;
    border-radius: 50px;
    left: 50%;
    transform: translateX(-50%);
    animation-duration: 0.5s;
    animation-fill-mode: both;
    transition: all ease 0.5s;
    text-align:center;

    &.close {
        animation-name: bounceClose;
    }

    &.open {
        animation-name: bounceOpen;
    }

    @keyframes bounceOpen {
        0% {
          bottom: -100%;
          opacity: 0;
        }
        50% {
          bottom: 40px;
        }
        90% {
          bottom: 20px;
          opacity: 1;
        }
        100% {
          bottom: 20px;
        }
      }
      
      @keyframes bounceClose {
        0% {
          bottom: 20px;
          opacity: 1;
        }
        50% {
          bottom: 40px;
        }
        75% {
          bottom: 20px;
          opacity: 0;
        }
        100% {
          bottom: -100%;
        }
      }
`;

export const NotificationContent = styled.div``;

