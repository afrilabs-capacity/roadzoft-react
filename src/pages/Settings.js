import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Icon from "@mui/icons-material";
import * as Item from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { API_BASE } from "../utils/Api";
import { useParams } from "react-router-dom";
import ProjectTable from "../components/tables/ProjectTable";
import ReportModal from "../components/modals/ReportModal";

const Input = styled("input")({
  display: "none",
});

function Settings() {
  const params = useParams();
  const [user, setUser] = React.useState({});
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [newemail, setNewEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [image, setImage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [newphone, setNewPhone] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [userProjects, setUserProjects] = React.useState([]);
  const [userReports, setUserReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [photo, setPhoto] = React.useState("");
  const [uploadedImage, setUploadedImage] = React.useState("");
  const [realUser, setRealUser] = React.useState([]);

  //Handle changes
  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    setUserstate(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
  };
  //Image Change
  const handleImage = (event) => {
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      setUploadedImage(URL.createObjectURL(event.target.files[0]));
      setPhoto(reader.result);
    };
  };

  //Post Images
  const addImage = async () => {
    console.log("myImage", photo);
    const response = await fetch(`${API_BASE}/user/profile/avatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: user.id,
        photo: photo,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    setPhoto("");
    setUploadedImage("");
    getRealUser();
    console.log("Image", result);
  };

  //Update User account
  const updateUser = async () => {
    if (password == "") {
      setMessage("Password Can not be empty")
    } else {
    const response = await fetch(`${API_BASE}/user/update/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        password
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    console.log("Register", result);
  }
  };


  //header user
  const title = "Settings";

  const states = [
    {
      code: "FC",
      name: "Abuja",
      lgas: ["Abuja", "Kwali", "Kuje", "Gwagwalada", "Bwari", "Abaji"],
    },
    {
      code: "AB",
      name: "Abia",
      lgas: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikawuno",
        "Ikwuano",
        "Isiala-Ngwa North",
        "Isiala-Ngwa South",
        "Isuikwuato",
        "Umu Nneochi",
        "Obi Ngwa",
        "Obioma Ngwa",
        "Ohafia",
        "Ohaozara",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa West",
        "Ukwa East",
        "Umuahia North",
        "Umuahia South",
      ],
    },
    {
      code: "AD",
      name: "Adamawa",
      lgas: [
        "Demsa",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi-North",
        "Mubi-South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
    },
    {
      code: "AK",
      name: "AkwaIbom",
      lgas: [
        "Abak",
        "Eastern-Obolo",
        "Eket",
        "Esit-Eket",
        "Essien-Udim",
        "Etim-Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo-Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot-Abasi",
        "Ikot-Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot-Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Urue-Offong/Oruko",
        "Uruan",
        "Uyo",
      ],
    },
    {
      code: "AN",
      name: "Anambra",
      lgas: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili-North",
        "Idemili-South",
        "Ihiala",
        "Njikoka",
        "Nnewi-North",
        "Nnewi-South",
        "Ogbaru",
        "Onitsha-North",
        "Onitsha-South",
        "Orumba-North",
        "Orumba-South",
      ],
    },
    {
      code: "BA",
      name: "Bauchi",
      lgas: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas Gadau",
        "Jama'Are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa-Balewa",
        "Toro",
        "Warji",
        "Zaki",
      ],
    },
    {
      code: "BY",
      name: "Bayelsa",
      lgas: [
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern-Ijaw",
        "Yenagoa",
      ],
    },
    {
      code: "BE",
      name: "Benue",
      lgas: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer-East",
        "Gwer-West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Otukpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ],
    },
    {
      code: "BO",
      name: "Borno",
      lgas: [
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala Balge",
        "Konduga",
        "Kukawa",
        "Kwaya-Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ],
    },
    {
      code: "CR",
      name: "CrossRiver",
      lgas: [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar-Municipal",
        "Calabar-South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakurr",
        "Yala",
      ],
    },
    {
      code: "DE",
      name: "Delta",
      lgas: [
        "Aniocha North",
        "Aniocha-North",
        "Aniocha-South",
        "Bomadi",
        "Burutu",
        "Ethiope-East",
        "Ethiope-West",
        "Ika-North-East",
        "Ika-South",
        "Isoko-North",
        "Isoko-South",
        "Ndokwa-East",
        "Ndokwa-West",
        "Okpe",
        "Oshimili-North",
        "Oshimili-South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli-North",
        "Ughelli-South",
        "Ukwuani",
        "Uvwie",
        "Warri South-West",
        "Warri North",
        "Warri South",
      ],
    },
    {
      code: "EB",
      name: "Ebonyi",
      lgas: [
        "Abakaliki",
        "Afikpo-North",
        "Afikpo South (Edda)",
        "Ebonyi",
        "Ezza-North",
        "Ezza-South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaukwu",
        "Onicha",
      ],
    },
    {
      code: "ED",
      name: "Edo",
      lgas: [
        "Akoko Edo",
        "Egor",
        "Esan-Central",
        "Esan-North-East",
        "Esan-South-East",
        "Esan-West",
        "Etsako-Central",
        "Etsako-East",
        "Etsako-West",
        "Igueben",
        "Ikpoba-Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia-North-East",
        "Ovia-South-West",
        "Owan East",
        "Owan-West",
        "Uhunmwonde",
      ],
    },
    {
      code: "EK",
      name: "Ekiti",
      lgas: [
        "Ado-Ekiti",
        "Efon",
        "Ekiti-East",
        "Ekiti-South-West",
        "Ekiti-West",
        "Emure",
        "Gbonyin",
        "Ido-Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye",
      ],
    },
    {
      code: "EN",
      name: "Enugu",
      lgas: [
        "Aninri",
        "Awgu",
        "Enugu-East",
        "Enugu-North",
        "Enugu-South",
        "Ezeagu",
        "Igbo-Etiti",
        "Igbo-Eze-North",
        "Igbo-Eze-South",
        "Isi-Uzo",
        "Nkanu-East",
        "Nkanu-West",
        "Nsukka",
        "Oji-River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
      ],
    },
    {
      code: "GO",
      name: "Gombe",
      lgas: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu Deba",
      ],
    },
    {
      code: "IM",
      name: "Imo",
      lgas: [
        "Aboh-Mbaise",
        "Ahiazu-Mbaise",
        "Ehime-Mbano",
        "Ezinihitte",
        "Ideato-North",
        "Ideato-South",
        "Ihitte Uboma",
        "Ikeduru",
        "Isiala-Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor-Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Onuimo",
        "Orlu",
        "Orsu",
        "Oru-East",
        "Oru-West",
        "Owerri-Municipal",
        "Owerri-North",
        "Owerri-West",
      ],
    },
    {
      code: "JI",
      name: "Jigawa",
      lgas: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin-Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin-Hausa",
        "Kaugama",
        "Kazaure",
        "Kiri kasama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule-Tankarkar",
        "Taura",
        "Yankwashi",
      ],
    },
    {
      code: "KD",
      name: "Kaduna",
      lgas: [
        "Birnin-Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'A",
        "Kachia",
        "Kaduna-North",
        "Kaduna-South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon-Gari",
        "Sanga",
        "Soba",
        "Zangon-Kataf",
        "Zaria",
      ],
    },
    {
      code: "KN",
      name: "Kano",
      lgas: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin-Kudu",
        "Dawakin-Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun-Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano-Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin-Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun-Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ],
    },
    {
      code: "KT",
      name: "Katsina",
      lgas: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dan-Musa",
        "Dandume",
        "Danja",
        "Daura",
        "Dutsi",
        "Dutsin-Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai-Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ],
    },
    {
      code: "KE",
      name: "Kebbi",
      lgas: [
        "Aleiro",
        "Arewa-Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin-Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko-Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru",
      ],
    },
    {
      code: "KO",
      name: "Kogi",
      lgas: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela-Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Oyi",
        "Yagba-East",
        "Yagba-West",
      ],
    },
    {
      code: "KW",
      name: "Kwara",
      lgas: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti (Araromi/Opin)",
        "Ilorin-East",
        "Ilorin-South",
        "Ilorin-West",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke-Ero",
        "Oyun",
        "Pategi",
      ],
    },
    {
      code: "LA",
      name: "Lagos",
      lgas: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos-Island",
        "Lagos-Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
        "Yewa-South",
      ],
    },
    {
      code: "NA",
      name: "Nassarawa",
      lgas: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa-Eggon",
        "Obi",
        "Wamba",
        "Toto",
      ],
    },
    {
      code: "NI",
      name: "Niger",
      lgas: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ],
    },
    {
      code: "OG",
      name: "Ogun",
      lgas: [
        "Abeokuta-North",
        "Abeokuta-South",
        "Ado-Odo Ota",
        "Ewekoro",
        "Ifo",
        "Ijebu-East",
        "Ijebu-North",
        "Ijebu-North-East",
        "Ijebu-Ode",
        "Ikenne",
        "Imeko-Afon",
        "Ipokia",
        "Obafemi-Owode",
        "Odeda",
        "Odogbolu",
        "Ogun-Waterside",
        "Remo-North",
        "Shagamu",
        "Yewa North",
      ],
    },
    {
      code: "ON",
      name: "Ondo",
      lgas: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure-North",
        "Akure-South",
        "Ese-Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile-Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ondo-East",
        "Ose",
        "Owo",
      ],
    },
    {
      code: "OS",
      name: "Osun",
      lgas: [
        "Atakumosa West",
        "Atakumosa East",
        "Ayedaade",
        "Ayedire",
        "Boluwaduro",
        "Boripe",
        "Ede South",
        "Ede North",
        "Egbedore",
        "Ejigbo",
        "Ife North",
        "Ife South",
        "Ife-Central",
        "Ife-East",
        "Ifelodun",
        "Ila",
        "Ilesa-East",
        "Ilesa-West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo-Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ],
    },
    {
      code: "OY",
      name: "Oyo",
      lgas: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa-Central",
        "Ibarapa-East",
        "Ibarapa-North",
        "Ido",
        "Ifedayo",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogo-Oluwa",
        "Ogbomosho-North",
        "Ogbomosho-South",
        "Olorunsogo",
        "Oluyole",
        "Ona-Ara",
        "Orelope",
        "Ori-Ire",
        "Oyo-West",
        "Oyo-East",
        "Saki-East",
        "Saki-West",
        "Surulere",
      ],
    },
    {
      code: "PL",
      name: "Plateau",
      lgas: [
        "Barkin-Ladi",
        "Bassa",
        "Bokkos",
        "Jos-East",
        "Jos-North",
        "Jos-South",
        "Kanam",
        "Kanke",
        "Langtang-North",
        "Langtang-South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ],
    },
    {
      code: "RI",
      name: "Rivers",
      lgas: [
        "Abua Odual",
        "Ahoada-East",
        "Ahoada-West",
        "Akuku Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emuoha",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio Akpor",
        "Ogba-Egbema-Ndoni",
        "Ogba Egbema Ndoni",
        "Ogu Bolo",
        "Okrika",
        "Omuma",
        "Opobo Nkoro",
        "Oyigbo",
        "Port-Harcourt",
        "Tai",
      ],
    },
    {
      code: "SO",
      name: "Sokoto",
      lgas: [
        "Binji",
        "Bodinga",
        "Dange-Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto-North",
        "Sokoto-South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ],
    },
    {
      code: "TA",
      name: "Taraba",
      lgas: [
        "Ardo-Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim-Lamido",
        "Kurmi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ],
    },
    {
      code: "YO",
      name: "Yobe",
      lgas: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ],
    },
    {
      code: "ZA",
      name: "Zamfara",
      lgas: [
        "Anka",
        "Bakura",
        "Birnin Magaji/Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Isa",
        "Kaura-Namoda",
        "Kiyawa",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata-Mafara",
        "Tsafe",
        "Zurmi",
      ],
    },
  ];

  //Get single user
  const getRealUser = async () => {
    const userId = params.id;
    try {
      const response = await fetch(
        `${API_BASE}/user/${localStorage.getItem("user")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      const data = result.data;
      setUser(result.data);
      setUserId(result.data.id)
      setLoading(false)
      console.log("Real User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRealUser();
  }, []);

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={realUser} title={title.toUpperCase()} />
          <hr />
          {message != "" && (
            <Item.Alert
              onClose={() => setMessage("")}
              variant="filled"
              color="info"
            >
              {message}
            </Item.Alert>
          )}
          <div className="profile-picture flex flex-col justify-center items-center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file">
                <Input
                  onChange={handleImage}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Item.Avatar
                    src={`https://roadzoftserver.xyz/uploads/avatar/${user.photos == null ? "" : user.photos.photo}`}
                    style={{ height: 90, width: 90 }}
                    variant="circular"
                  />
                  {uploadedImage != "" && (
                    <Item.Avatar
                      src={uploadedImage}
                      style={{ height: 90, width: 90 }}
                      variant="circular"
                    />
                  )}
                </IconButton>
              </label>
            </Stack>
            <p>Tap to add profile picture (optional)</p>
            {photo != "" && (
              <Item.Button
                className="user-button"
                onClick={addImage}
                color="secondary"
                variant="contained"
              >
                Upload Image
              </Item.Button>
            )}
          </div>
          {loading ? (
            <Item.Box
              className="flex justify-center items-center"
              sx={{ display: "flex" }}
            >
              <Item.CircularProgress />
            </Item.Box>
          ) : (
            <form className="">
              <div className="flex flex-row justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                  <div>
                    
                    <div className="my-3 flex flex-row justify-evenly items-center"></div>
                    <div className="my-3 flex justify-evenly items-center">
                      <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="outlined-basic"
                        label="Change Password"
                        variant="outlined"
                      />

                    </div>
                    <div className="my-3 flex flex-row justify-evenly items-center">
                      <Item.Button
                        className="user-button"
                        onClick={updateUser}
                        color="primary"
                        variant="contained"
                      >
                        Change Password
                      </Item.Button>
                     
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
