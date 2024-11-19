<?php

require_once '../config/dompdf/autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();
$options->set('defaultFont', 'Courier');
$dompdf = new Dompdf($options);
try {
    // Código de Dompdf
    $dompdf->loadHtml($_GET['string']);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();
    $dompdf->stream("pedido.pdf", array("Attachment" => 1));
} catch (Exception $e) {
    echo "Error al generar el PDF: " . $e->getMessage();
    exit; // Asegúrate de salir para evitar más errores
}

?>