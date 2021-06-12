import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;

	.blogs-title {
		margin: 8rem;
		font-size: 2.25rem;
		font-weight: bold;

		.blogs-count {
			color: #E74C3C;
		}
	}
`;


export const Wrapper = styled.div`
	display: grid;
	grid-gap: 30px 60px;
	grid-template-columns: repeat(4, 1fr);

	@media (max-width: 650px) {
	grid-template-columns: repeat(2, 1fr);
	}
`;
