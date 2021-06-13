import styled from "styled-components";

export const CardContainer = styled.article`
	width: 120px;
	height: 100px;
`;

export const CardWrapper = styled.a`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme['font']};

	.blog-image {
		width: 32px;
		margin-bottom: 18px;
	}

	.blog-name {
		font-size: 1.75rem;
		font-weight: 600;
	}

	&:hover {
		transform: scale(1.1);
		transition: 0.2s ease-out;
	}
`;