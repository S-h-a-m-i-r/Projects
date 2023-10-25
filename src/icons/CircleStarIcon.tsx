import { SvgIcon } from "@mui/material";
import { SvgIconType } from "./SvgIconType";

const CircleStarIcon: SvgIconType = (props) => {
  return (
    <SvgIcon fill="none" viewBox="0 0 22 22" {...props}>
      <path d="M10.9998 16.4167L12.6898 12.7117L16.4165 11L12.6898 9.31001L10.9998 5.58334L9.29901 9.31001L5.58318 11L9.29901 12.7117L10.9998 16.4167ZM6.85068 0.990005C8.16701 0.448282 9.5764 0.168613 10.9998 0.166672C12.419 0.166672 13.8273 0.448338 15.149 0.990005C16.4598 1.53167 17.6515 2.33334 18.659 3.34084C19.6665 4.34834 20.4682 5.54001 21.0098 6.85084C21.5515 8.17251 21.8332 9.58084 21.8332 11C21.8332 13.8708 20.6957 16.6333 18.659 18.6592C17.6542 19.6665 16.4604 20.4654 15.146 21.0101C13.8316 21.5548 12.4226 21.8346 10.9998 21.8333C9.5764 21.8314 8.16701 21.5517 6.85068 21.01C5.53741 20.465 4.34462 19.6661 3.34067 18.6592C2.33339 17.6544 1.53446 16.4605 0.989752 15.1461C0.445043 13.8318 0.165275 12.4228 0.166508 11C0.166508 8.12917 1.30401 5.36667 3.34067 3.34084C4.34818 2.33334 5.53984 1.53167 6.85068 0.990005ZM4.86818 17.1317C6.49318 18.7567 8.70318 19.6667 10.9998 19.6667C13.2965 19.6667 15.5065 18.7567 17.1315 17.1317C18.7565 15.5067 19.6665 13.2967 19.6665 11C19.6665 8.70334 18.7565 6.49334 17.1315 4.86834C15.5043 3.24425 13.2989 2.33248 10.9998 2.33334C8.70318 2.33334 6.49318 3.24334 4.86818 4.86834C3.24408 6.49559 2.33232 8.70096 2.33317 11C2.33317 13.2967 3.24318 15.5067 4.86818 17.1317Z" />
    </SvgIcon>
  );
};

export default CircleStarIcon;