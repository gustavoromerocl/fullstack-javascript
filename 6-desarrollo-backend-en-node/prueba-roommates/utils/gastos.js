const removerGastos = (roommates, gastos, id) => {
  const largo = roommates.length;
  const gasto = gastos.find(el => el.id === id);

  //dividir gasto y calcular debe y recibe
  const gastoFragmentado = gasto.monto / largo
  const saldoFavorable = gastoFragmentado * (largo - 1);


  //Eliminar debe y recibe de los usuarios en base a este gasto
  return roommates.map(
    el => el.nombre !== gasto.roommate 
    ? { ...el, debe: el.debe - gastoFragmentado } 
    : { ...el, recibe: el.recibe - saldoFavorable });
}

const agregarGastos = (roommates, payload) => {
  const largo = roommates.length;
  //Calcular la división de gastos
  const gastoFragmentado = payload.monto / largo
  const saldoFavorable = gastoFragmentado * (largo - 1);

  //Actualizar debe y recibe a excepción de quien realizo la compra que solo recibe
  return roommates.map(
    el => el.nombre !== payload.roommate 
    ? { ...el, debe: el.debe + gastoFragmentado } 
    : { ...el, recibe: el.recibe + saldoFavorable });
}

module.exports = { 
  removerGastos, 
  agregarGastos,
}