import { React, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import HealingTwoToneIcon from "@mui/icons-material/HealingTwoTone";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import VaccinesTwoToneIcon from "@mui/icons-material/VaccinesTwoTone";

export default function ItemForm({ title, icon, items, setItemForm }) {
    switch (icon) {
        case "HealingTwoToneIcon":
            icon = <HealingTwoToneIcon />;
            break;
        case "ScienceTwoToneIcon":
            icon = <ScienceTwoToneIcon />;
            break;
        default:
            icon = <VaccinesTwoToneIcon />;
    }
    const setItemList = items.map((item, index) => {
        return (
            <div className="d-flex my-1" key={index}>
                <li className="list-group-item  col ">{item}</li>
                <Button
                    variant="outline-danger"
                    onClick={(e) => {
                        setItemForm(items.filter((e) => e !== item));
                    }}
                >
                    ❌
                </Button>
            </div>
        );
    });
    const [inputValue, setInputValue] = useState("");

    return (
        <>
            <h4 className="my-3">
                {icon} {title}
            </h4>

            <Row>
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder=""
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button
                            variant="primary"
                            type="button"
                            onClick={(e) => {
                                if (inputValue.trim() !== "")
                                    setItemForm([...items, inputValue.trim()]);
                            }}
                        >
                            Agregar
                        </Button>
                    </InputGroup>

                    <ul className="list-group mt-3">{setItemList}</ul>
                </Col>
            </Row>
        </>
    );
}
