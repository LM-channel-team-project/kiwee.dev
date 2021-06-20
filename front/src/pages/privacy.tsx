import React, { useEffect } from "react";
import styled from "styled-components";

import { useModal } from "@/hooks/useModalContext";
import SEO from "@/components/SEO";

function privacy() {
  const [ modal, toggleModal, closeModal ] = useModal();

	useEffect(() => {
		closeModal();
	}, [])

	return (
		<>
			<SEO />
			<Privacys>
				<section>
					<h1>Kiwee 개인정보처리방침</h1>
					<h2>1. 개인정보처리방침이란?</h2>
						<p>Kiwee는 이용자의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며, 이용자의 권리를 적극적으로 보장합니다.</p>
						<p>Kiwee는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다.</p>
						<p>'개인정보 처리방침'이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 Kiwee가 준수해야 할 지침을 의미합니다.</p>
						<p>본 개인정보 처리방침은 Kiwee에 적용됩니다.</p>
					<h2>2. 개인정보 수집</h2>
						<p>서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.</p>
						<p>모든 이용자는 Kiwee가 제공하는 서비스를 이용할 수 있고, 회원가입을 통해 더욱 다양한 서비스를 제공받을 수 있습니다. 이용자의 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하도록 하겠습니다.</p>
						<p>수집하는 개인정보는 다음과 같습니다.</p>
						<p>회원 가입 및 서비스 이용 과정에서 아래와 같은 최소한의 개인정보를 수집하고 있으며, 이용자의 동의없이 민감정보를 수집하지 않습니다.</p>
						<ul>
							<li>필수정보: 해당 서비스의 본질적 기능을 수행하기 위한 정보</li>
							<li>선택정보: 보다 특화된 서비스를 제공하기 위해 추가 수집하는 정보</li>
							<li>민감정보: 이용자의 사생활을 침해할 우려가 있는 정보</li>
						</ul>
						<h3>[회원가입시]</h3>
							<p>필수: 이메일주소</p>
						<h3>개인정보를 수집하는 방법은 다음과 같습니다.</h3>
							<p>개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.</p>
							<ul>
								<li>회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</li>
								<li>제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우</li>
							</ul>
						<h3>서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.</h3>
						<p>PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키, 방문일시, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.</p>
					<h2>3. 개인정보 이용</h2>
						<p>회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.</p>
						<p>회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같이 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.</p>
						<ul>
							<li>회원 식별/가입의사 확인, 본인 확인, 부정이용 방지</li>
							<li>인구통계학적 특성에 따른 분석 및 개인화 서비스 제공</li>
							<li>신규 서비스 개발, 다양한 서비스 제공, 문의사항 또는 불만처리, 공지사항 전달</li>
							<li>서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지 및 제재</li>
							<li>서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계, 맞춤형 서비스 제공, 서비스 개선에 활용</li>
						</ul>
				</section>
			</Privacys>
		</>
)
}
const Privacys = styled.main`

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
			border-radius: 10px;
			background: ${({ theme }) => theme['article-bg']};

			h1 {
				font-size: 4rem;
				margin-bottom: 5rem;
			}

			h2 {
				font-size: 3rem;
				margin: 3.5rem 0;
			}

			h3 {
				font-size: 2rem;
				margin: 3.5rem 0;
			}

			p {
				font-weight: 400;
				font-size: 2rem;
				margin: 3.5rem 0; 
				line-height: 3.75rem;
			}

			ul {
				list-style: square;
				margin-left: 2.5rem;
				li {
					font-weight: 400;
					margin: 1rem 0;
				}
			}
		}
`;

export default privacy;