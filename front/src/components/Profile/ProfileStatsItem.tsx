import styled from 'styled-components';

interface ProfileStatsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  count?: number;
  selected?: boolean;
}

function ProfileStatsItem({
  label = 'label',
  count = 0,
  selected = false,
  ...props
}: ProfileStatsItemProps) {
  return (
    <StyledButton selected={selected} {...props}>
      <span className="count">{count}</span>
      <span className="label">{label}</span>
    </StyledButton>
  );
}

const StyledButton = styled.button<ProfileStatsItemProps>`
  display: flex;
  width: 160px;
  height: 100px;
  padding: 2.4rem 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius: 0.8rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme['btn-hover-bg-2'] : theme['btn-hover-bg-1']};
  color: ${({ theme, selected }) => (selected ? theme['font'] : theme['font-inactive'])};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme['btn-hover-bg-2']};
  }
  .count {
    font-size: 1.8rem;
    font-weight: 700;
  }
  .label {
    font-size: 1.2rem;
  }
`;

export default ProfileStatsItem;
