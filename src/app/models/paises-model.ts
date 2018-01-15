export class PaisesModel{
    constructor(){}
    mx = ["Aguascalientes", "Baja California", "Baja California Sur",
"Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
"Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán",
"Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
"San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
"Veracruz", "Yucatán", "Zacatecas"];
    eu = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Carolina del Norte",
"Carolina del Sur", "Colorado", "Connecticut", "Dakota del Norte", "Dakota del Sur",
"Delaware", "Florida", "Georgia", "Hawái", "Idaho", "Illinois", "Indiana", 
"Iowa", "Kansas", "Kentucky", "Luisiana", "Maine", "Maryland", "Massachusetts", 
"Míchigan", "Minnesota", "Misisipi", "Misuri", "Montana", "Nebraska", "Nevada",
"Nueva Jersey", "Nueva York", "Nuevo Hampshire", "Nuevo México", "Ohio", "Oklahoma",
"Oregón", "Pensilvania", "Rhode Island", "Tennessee", "Texas", "Uta", "Vermont",
"Virginia", "Virginia Occidental", "Washington", "Wisconsin", "Wyomin"];
    ca = ["Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba",
"British Columbia", "Prince Edward Island", "Saskatchewan", "Alberta",
"Newfoundland and Labrador", "the Northwest Territories", "Yukon", "Nunavut"];
    ar = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
"Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
"Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
"Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
"Tucumán"];
    getEstados(pais: String){
        let estados;
        switch (pais) {
            case "mx":
                estados = this.mx;
                break;
            case "eu":
                estados = this.eu;
                break;
            case "ar":
                estados = this.eu;
                break;
            case "ca":
                estados = this.ca;
                break;    
            default:
                break;
        }
        return estados;
    }
}