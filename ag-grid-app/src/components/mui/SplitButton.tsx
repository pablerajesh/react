import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  ButtonGroup,
  ButtonGroupOwnProps,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@mui/material";
import { useRef, useState } from "react";

interface ISplitButtonProp {
  props?: ButtonGroupOwnProps;
  buttonSpecs: IButtonSpec[];
}

export interface IButtonSpec {
  id: number;
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

const SplitButton = ({ props, buttonSpecs }: ISplitButtonProp) => {
  const [open, setOpen] = useState<boolean>(false),
    handleToggle = () => setOpen(prev => !prev),
    anchorRef = useRef<HTMLDivElement>(null),
    [selectedButtonSpecId, setSelectedButtonSpecId] = useState<number>(1);

  const handleClose = (event: Event) => {
    if (!anchorRef.current?.contains(event.target as HTMLElement))
      setOpen(false);
  };

  const handleMenuItemClick = (selectedButtonSpec: IButtonSpec) => {
    setSelectedButtonSpecId(selectedButtonSpec.id);
    setOpen(false);
  };

  const handleClick = () =>
    buttonSpecs.find(b => b.id === selectedButtonSpecId)?.onClick?.();

  if (buttonSpecs.length === 0) return <></>;

  return (
    <>
      <ButtonGroup ref={anchorRef} {...props} aria-label="split button">
        <Button onClick={handleClick}>
          {buttonSpecs.find(b => b.id === selectedButtonSpecId)?.text}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="Select action"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ borderLeft: "1px solid #fff", width: "auto" }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        anchorEl={anchorRef.current}
        id="split-button-menu"
        open={open}
        transition={true}
        disablePortal={true}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem={true}>
                  {buttonSpecs.map(_buttonSpec => (
                    <MenuItem
                      key={_buttonSpec.id}
                      disabled={_buttonSpec.disabled}
                      selected={selectedButtonSpecId === _buttonSpec.id}
                      onClick={() => handleMenuItemClick(_buttonSpec)}
                    >
                      {_buttonSpec.text}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SplitButton;
