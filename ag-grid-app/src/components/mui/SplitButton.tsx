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
import { useMemo, useRef, useState } from "react";

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
  const [buttonMenuPopperOpen, setButtonMenuPopperOpen] =
      useState<boolean>(false),
    anchorRef = useRef<HTMLDivElement>(null),
    [selectedButtonId, setSelectedButtonId] = useState<number>(1);

  const handleButtonToggle = () =>
    setButtonMenuPopperOpen(openPreviously => !openPreviously);

  const selectedButtonText = useMemo(
    () => buttonSpecs.find(b => b.id === selectedButtonId)?.text,
    [selectedButtonId]
  );

  const handleClose = (event: Event) => {
    if (!anchorRef.current?.contains(event.target as HTMLElement))
      setButtonMenuPopperOpen(false);
  };

  const handleMenuItemClick = (selectedButtonSpec: IButtonSpec) => {
    setSelectedButtonId(selectedButtonSpec.id);
    setButtonMenuPopperOpen(false);
  };

  const handleButtonClick = () =>
    buttonSpecs.find(b => b.id === selectedButtonId)?.onClick?.();

  if (buttonSpecs.length === 0) return <></>;
  return (
    <>
      <ButtonGroup ref={anchorRef} {...props} aria-label="split button">
        <Button onClick={handleButtonClick}>{selectedButtonText}</Button>
        <Button
          aria-controls={buttonMenuPopperOpen ? "split-button-menu" : undefined}
          aria-expanded={buttonMenuPopperOpen ? "true" : undefined}
          aria-label="Select action"
          aria-haspopup="menu"
          onClick={handleButtonToggle}
          sx={{ borderLeft: "1px solid #fff", width: "auto" }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        anchorEl={anchorRef.current}
        id="split-button-menu"
        open={buttonMenuPopperOpen}
        transition={true}
        disablePortal={true}
        placement="bottom-end"
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
                      selected={selectedButtonId === _buttonSpec.id}
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
