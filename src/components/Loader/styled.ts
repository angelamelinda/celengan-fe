import styled from 'styled-components';

export const LoaderContainer = styled.div`
	.stardust-spinner {
		animation: 0.4s movement linear infinite;

		&:nth-child(2) {
		animation-delay: 0.1s;
		}

		&:nth-child(3) {
		animation-delay: 0.2s;
		}
	}

	@keyframes movement {
		0% {
		transform: translateY(2px);
		}

		50% {
		transform: translateY(-2px);
		}

		to {
		transform: translateY(2px);
		}
	}
`;

export const LoaderWrapper = styled.div`
	position: fixed;
	height: 100vh;
	background: rgba(255, 255, 255, .5);
	z-index: 2;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
