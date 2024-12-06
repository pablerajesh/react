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
  startIcon?: React.ReactNode;
  buttonSpecs: IButtonSpec[];
}

export interface IButtonSpec {
  id: number;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SplitButton = ({ props, startIcon, buttonSpecs }: ISplitButtonProp) => {
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

  const selectedButtonIsDisabled = useMemo(
    () => buttonSpecs.find(b => b.id === selectedButtonId)?.disabled,
    [selectedButtonId]
  );

  if (buttonSpecs.length === 0) return <></>;
  return (
    <>
      <ButtonGroup ref={anchorRef} {...props} aria-label="split button">
        <Button
          disabled={selectedButtonIsDisabled}
          startIcon={startIcon}
          onClick={handleButtonClick}
        >
          {selectedButtonText}
        </Button>
        <Button
          onClick={handleButtonToggle}
          aria-controls={buttonMenuPopperOpen ? "split-button-menu" : undefined}
          aria-expanded={buttonMenuPopperOpen ? "true" : undefined}
          aria-label="Select action"
          aria-haspopup="menu"
          size="small"
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
                  {buttonSpecs.map(bs => (
                    <MenuItem
                      key={bs.id}
                      disabled={bs.disabled}
                      selected={selectedButtonId === bs.id}
                      onClick={() => handleMenuItemClick(bs)}
                    >
                      {bs.text}
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
