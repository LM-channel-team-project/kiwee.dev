import React, { useEffect } from "react";
import styled from "styled-components";

import { useModal } from "@/hooks/useModalContext";
import SEO from "@/components/SEO";

function term() {
  const [ modal, toggleModal, closeModal ] = useModal();

	useEffect(() => {
		closeModal();
	}, [])

	return (
		<>
			<SEO />
			<Terms>
				<section>
					<h1>Kiwee 약관</h1>
						<h2>Kiwee 소개</h2>
							<p>Kiwee는 여러 IT기술 블로그들의 최신 포스트들을 한 곳에서 모아 보여주는 서비스를 제공하는 사이트입니다. </p>
							<p>제공되는 모든 포스트들은 RSS를 제공하는 블로그에서 수집하고 있으며, 해당하는 포스트들의 저작권은 Kiwee가 아닌 해당 블로그를 소유한 곳에 있습니다.</p>
						<h2>로그인을 하면 추가 서비스를 이용할 수 있습니다.</h2>
							<p>가입 시 이메일 주소를 필수 항목으로 요구하고 있으며, 이는 각 회원을 식별하기 위한 최소한의 정보입니다. 이메일 주소 이외에 추가적인 정보는 로그인 인증을 제공하는 업체에서 제공하는 최소한의 정보만을 저장합니다.</p>
						<h2>부득이 서비스 이용을 제한할 경우 합리적인 절차를 준수합니다.</h2>
							<p>악의적으로 서비스를 방해하는 경우, 타 사용자의 자유를 심각하게 침해하는 경우와 같이 약관 및 운영 정책을 위반하시는 경우에 서비스 이용을 일부 또는 전부 제한할 수 있습니다.</p>
						<h2>여러분의 소중한 피드백에 최대한 빠르게 답변드리겠습니다.</h2>
							<p>GitHub의 Issue를 통해 서비스에 관련된 의견이나 개선사항을 전달하실 수 있으며, 처리 과정 및 결과를 전달할 수 있도록 노력하겠습니다.</p>
				</section>
			</Terms>
		</>
	)
}

const Terms = styled.main`
	width: 1728px;

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 3.2rem);
  }

		section {
			font-weight: 600;
			margin: 7rem auto;
			padding: 5rem;
			border-radius: 8px;
			background: ${({ theme }) => theme['article-bg']};

			h1 {
				font-size: 4.5rem;
				margin-bottom: 5rem;
			}

			h2 {
				font-size: 3rem;
				margin: 3.5rem 0;
			}

			p {
				font-weight: 400;
				font-size: 2rem;
				margin: 3.5rem 0; 
				line-height: 3.75rem;
			}
		}
`;

export default term;