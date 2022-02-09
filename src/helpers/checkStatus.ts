export type StatusDataType = {
  name: string;
  color: string;
};

export default (status: string) => {
  let statusData = {
    name: '',
    color: ''
  };
  switch (status) {
    case 'pending':
      statusData = { name: 'Pendente', color: 'danger' };
      break;
    case 'preparing':
      statusData = { name: 'Preparando', color: 'warning' };
      break;
    case 'sent':
      statusData = { name: 'Enviado', color: 'primary' };
      break;
    case 'delivered':
      statusData = { name: 'Entregue', color: 'success' };
      break;
    default:
      break;
  }
  return statusData;
};
