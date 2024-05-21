import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const products = [
  { code: "P1", name: "Product 1", category: "Category 1", quantity: 10 },
  { code: "P2", name: "Product 2", category: "Category 2", quantity: 20 },
  // Añade más productos aquí
];

const body = (
  <DataTable value={products} stripedRows tableStyle={{ minWidth: "50rem" }}>
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
);

export default function PrimeReact_table() {
    return (
        <PrimeReactProvider>
            {body}
        </PrimeReactProvider>
    );
}