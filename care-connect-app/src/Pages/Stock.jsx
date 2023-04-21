import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Search } from "@mui/icons-material";
import { API_URL } from '/config'
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";

function Stock() {
  const [id_instalacion_medica, setid_instalacion_medica] = useState("")
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [instalaciones, setInstalaciones] = useState([])

  const handleid_instalacion_medicaChange = (event) => {
    setid_instalacion_medica(event.target.value);
  };
 
  const handleMaxQuantityChange = (event) => {
    setMaxQuantity(event.target.value);
  };

  const handleMinQuantityChange = (event) => {
    setMinQuantity(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
        fetch(`${API_URL}/instalacion_medica`, { mode: 'cors' })
            .then((response) => response.json())
            .then((data) => setInstalaciones(data))
            .catch((error) => console.log(error))
    }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
	try {
	  const response = await fetch(
		`${API_URL}/stock?id_instalacion_medica=${id_instalacion_medica}`
	  );
	  const data = await response.json();
	  console.log("API response:", data);
	  const filteredData = data.filter((producto) => {
		// Filtrar por nombre de producto
		if (searchTerm && !producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
		  return false;
		}
		// Filtrar por fecha de expiración
		if (startDate && new Date(producto.fecha_exp) < new Date(startDate)) {
		  return false;
		}
		if (endDate && new Date(producto.fecha_exp) > new Date(endDate)) {
		  return false;
		}
		// Filtrar por cantidad
		if (minQuantity && producto.cantidad < parseInt(minQuantity)) {
		  return false;
		}
		if (maxQuantity && producto.cantidad > parseInt(maxQuantity)) {
		  return false;
		}
		return true;
	  });
	  setSearchResults(filteredData);
	} catch (error) {
	  console.error(error);
	}
  };

  const handleClearFilters = () => {
	setid_instalacion_medica("")
	setSearchTerm("")
    setStartDate("");
    setMinQuantity("");
    setMaxQuantity("");
    setEndDate("");
    setSearchResults([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Consultas Stock</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            InputProps={{ startAdornment: <Search /> }}
            onChange={handleSearchTermChange}
          />
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={4}>
      <FormControl fullWidth margin="normal">
                            <InputLabel>Hospital</InputLabel>
                            <Select
                                label="Hospital"
                                id="hospital-filter-select"
                                value={id_instalacion_medica}
                                onChange={handleid_instalacion_medicaChange}
                                required
                            >
                                
                                {instalaciones.map((instalacion) => (
                                    <MenuItem
                                        key={instalacion[0]}
                                        value={instalacion[0]}
                                    >
                                        {instalacion[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
      </Col>
      <Col xs={12} md={4}>
          <TextField
            label="Min Quantity"
            variant="outlined"
            size="small"
            fullWidth
            value={minQuantity}
            onChange={handleMinQuantityChange}
            sx={{ mt: 1 }}
          />
      </Col>
      <Col xs={12} md={4}>
        <TextField
          label="Max Quantity"
          variant="outlined"
          size="small"
          fullWidth
          value={maxQuantity}
          onChange={handleMaxQuantityChange}
          sx={{ mt: 1, ml: 1 }}
          />
        </Col>
        <Col xs={12} md={4}>
          <TextField
            type="date"
            label="Expiration Date From"
            variant="outlined"
            size="small"
            fullWidth
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 1, ml: 0 }}
          ></TextField>
        </Col>
        <Col xs={12} md={4}>
          <TextField
            type="date"
            label="Expiration Date To"
            variant="outlined"
            size="small"
            fullWidth
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 1, ml: 0 }}
          ></TextField>
        </Col>
        <Col>
          <Box sx={{ mt: 7, ml: -95 }}>
            <Button 
            variant="contained" 
            sx={{ height: '100%' }} 
            onClick={handleSearch}>
              Buscar
            </Button>
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Fecha de expiracion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
		{searchResults.map((producto) => (
			<TableRow key={producto.nombre}>
			<TableCell>{producto.nombre}</TableCell>
			<TableCell>{producto.cantidad}</TableCell>
			<TableCell>{new Date(producto.fecha_exp).toLocaleDateString()}</TableCell>
			</TableRow>
		))}
		</TableBody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Box>
        </Col>
			</Row>
		</Container>
	);
}

export default Stock;
