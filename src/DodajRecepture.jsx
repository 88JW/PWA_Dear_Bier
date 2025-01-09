import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function DodajRecepture() {
    const navigate = useNavigate();
    const [nazwaReceptury, setNazwaReceptury] = useState("");
    const [rodzajReceptury, setRodzajReceptury] = useState("");
    const [slodyZacierane, setSlodyZacierane] = useState([{ nazwa: "", waga: "" }]);
    const [slodyEkstraktowe, setSlodyEkstraktowe] = useState([{ nazwa: "", waga: "" }]);
    const [chmiele, setChmiele] = useState([{ nazwa: "", waga: "", czas: "" }]);
    const [drozdze, setDrozdze] = useState("");
    const [litry, setLitry] = useState("");
    const [ekstrakt, setEkstrakt] = useState("");
    const [alkohol, setAlkohol] = useState("");
    const [barwa, setBarwa] = useState("");
    const [goryczka, setGoryczka] = useState("");
    const [dojrzewanie, setDojrzewanie] = useState("");
    const [procedura, setProcedura] = useState("");


    const handleDodajRecepture = (event) => {
        event.preventDefault();
        const nowaReceptura = {
            id: Date.now(),
            nazwa: nazwaReceptury,
            rodzaj: rodzajReceptury,
            slodyZacierane: rodzajReceptury === "Zacierana" ? slodyZacierane : [],
            slodyEkstraktowe: rodzajReceptury === "Ekstraktowa" ? slodyEkstraktowe : [],
            chmiele: chmiele,
            drozdze: drozdze,
            litry: litry,
            ekstrakt: ekstrakt,
            alkohol: alkohol,
            barwa: barwa,
            goryczka: goryczka,
            dojrzewanie: dojrzewanie,
            procedura: procedura,
        };
        const localData = localStorage.getItem("receptury");
        const receptury = localData ? JSON.parse(localData) : [];
        localStorage.setItem("receptury", JSON.stringify([...receptury, nowaReceptura]));

        navigate("/receptury");
    };
    const handleAnuluj = () => {
        navigate("/receptury");
    };

    const handleAddSlodZacierany = () => {
        setSlodyZacierane([...slodyZacierane, { nazwa: "", waga: "" }]);
    };

    const handleRemoveSlodZacierany = (index) => {
        const newSlody = [...slodyZacierane];
        newSlody.splice(index, 1);
        setSlodyZacierane(newSlody);
    };

    const handleSlodZacieranyChange = (index, event) => {
        const { name, value } = event.target;
        const newSlody = [...slodyZacierane];
        newSlody[index] = { ...newSlody[index], [name]: value };
        setSlodyZacierane(newSlody);
    };

    const handleAddSlodEkstraktowy = () => {
        setSlodyEkstraktowe([...slodyEkstraktowe, { nazwa: "", waga: "" }]);
    };

    const handleRemoveSlodEkstraktowy = (index) => {
        const newSlody = [...slodyEkstraktowe];
        newSlody.splice(index, 1);
        setSlodyEkstraktowe(newSlody);
    };

    const handleSlodEkstraktowyChange = (index, event) => {
        const { name, value } = event.target;
        const newSlody = [...slodyEkstraktowe];
        newSlody[index] = { ...newSlody[index], [name]: value };
        setSlodyEkstraktowe(newSlody);
    };
    const handleAddChmiel = () => {
        setChmiele([...chmiele, { nazwa: "", waga: "", czas: "" }]);
    };

    const handleRemoveChmiel = (index) => {
        const newChmiele = [...chmiele];
        newChmiele.splice(index, 1);
        setChmiele(newChmiele);
    };

    const handleChmielChange = (index, event) => {
        const { name, value } = event.target;
        const newChmiele = [...chmiele];
        newChmiele[index] = { ...newChmiele[index], [name]: value };
        setChmiele(newChmiele);
    };


    return (
        <div className="app-container">
            <h2>Dodaj nową recepturę</h2>
            <form onSubmit={handleDodajRecepture}>
                <TextField
                    label="Nazwa receptury"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nazwaReceptury}
                    onChange={(e) => setNazwaReceptury(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="rodzaj-receptury-label">Rodzaj receptury</InputLabel>
                    <Select
                        labelId="rodzaj-receptury-label"
                        id="rodzaj-receptury"
                        value={rodzajReceptury}
                        label="Rodzaj receptury"
                        onChange={(e) => setRodzajReceptury(e.target.value)}
                    >
                        <MenuItem value="Zacierana">Zacierana</MenuItem>
                        <MenuItem value="Ekstraktowa">Ekstraktowa</MenuItem>
                    </Select>
                </FormControl>

                {rodzajReceptury === "Zacierana" && (
                    <div>
                        <h3>Słody do zacierania:</h3>
                        {slodyZacierane.map((slod, index) => (
                            <Grid container spacing={2} key={index} alignItems="center">
                                <Grid item xs={5}>
                                    <TextField
                                        label="Nazwa słodu"
                                        variant="outlined"
                                        fullWidth
                                        name="nazwa"
                                        value={slod.nazwa}
                                        onChange={(e) => handleSlodZacieranyChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Waga (g)"
                                        variant="outlined"
                                        fullWidth
                                        name="waga"
                                        type="number"
                                        value={slod.waga}
                                        onChange={(e) => handleSlodZacieranyChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveSlodZacierany(index)}
                                    >
                                        Usuń
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Button variant="outlined" onClick={handleAddSlodZacierany}>
                            Dodaj słód
                        </Button>
                    </div>
                )}

                {rodzajReceptury === "Ekstraktowa" && (
                    <div>
                        <h3>Słody i ekstrakty:</h3>
                        {slodyEkstraktowe.map((slod, index) => (
                            <Grid container spacing={2} key={index} alignItems="center">
                                <Grid item xs={5}>
                                    <TextField
                                        label="Nazwa słodu/ekstraktu"
                                        variant="outlined"
                                        fullWidth
                                        name="nazwa"
                                        value={slod.nazwa}
                                        onChange={(e) => handleSlodEkstraktowyChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Waga (g)"
                                        variant="outlined"
                                        fullWidth
                                        name="waga"
                                        type="number"
                                        value={slod.waga}
                                        onChange={(e) => handleSlodEkstraktowyChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveSlodEkstraktowy(index)}
                                    >
                                        Usuń
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Button variant="outlined" onClick={handleAddSlodEkstraktowy}>
                            Dodaj słód/ekstrakt
                        </Button>
                    </div>
                )}
                <div>
                    <h3>Chmiele:</h3>
                    {chmiele.map((chmiel, index) => (
                        <Grid container spacing={2} key={index} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    label="Nazwa chmielu"
                                    variant="outlined"
                                    fullWidth
                                    name="nazwa"
                                    value={chmiel.nazwa}
                                    onChange={(e) => handleChmielChange(index, e)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Waga (g)"
                                    variant="outlined"
                                    fullWidth
                                    name="waga"
                                    type="number"
                                    value={chmiel.waga}
                                    onChange={(e) => handleChmielChange(index, e)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Czas (min)"
                                    variant="outlined"
                                    fullWidth
                                    name="czas"
                                    type="number"
                                    value={chmiel.czas}
                                    onChange={(e) => handleChmielChange(index, e)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleRemoveChmiel(index)}
                                >
                                    Usuń
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="outlined" onClick={handleAddChmiel}>
                        Dodaj chmiel
                    </Button>
                </div>
                <TextField
                    label="Drożdże"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={drozdze}
                    onChange={(e) => setDrozdze(e.target.value)}
                />
                 <TextField
                    label="Przewidywana ilość litrów"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={litry}
                    onChange={(e) => setLitry(e.target.value)}
                />
                <TextField
                    label="Ekstrakt"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={ekstrakt}
                    onChange={(e) => setEkstrakt(e.target.value)}
                />
                <TextField
                    label="Alkohol"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={alkohol}
                    onChange={(e) => setAlkohol(e.target.value)}
                />
                 <TextField
                    label="Barwa"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={barwa}
                    onChange={(e) => setBarwa(e.target.value)}
                />
                 <TextField
                    label="Goryczka"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={goryczka}
                    onChange={(e) => setGoryczka(e.target.value)}
                />
                 <TextField
                    label="Czas dojrzewania"
                    variant="outlined"
                    fullWidth
                     margin="normal"
                    value={dojrzewanie}
                    onChange={(e) => setDojrzewanie(e.target.value)}
                />
                 <TextField
                    label="Procedura"
                    variant="outlined"
                     multiline
                     rows={4}
                    fullWidth
                     margin="normal"
                    value={procedura}
                    onChange={(e) => setProcedura(e.target.value)}
                />


                <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
                    Dodaj
                </Button>
                <Button variant="outlined" onClick={handleAnuluj} sx={{ marginLeft: 2, marginTop: 2 }}>
                    Anuluj
                </Button>
            </form>
        </div>
    );
}

export default DodajRecepture;
