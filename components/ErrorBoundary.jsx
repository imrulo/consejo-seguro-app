import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Puedes enviar logs a un servicio externo aquí
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color:'#b00',padding:'2rem'}}><h2>Ha ocurrido un error inesperado.</h2><p>Por favor, recarga la página o vuelve más tarde.</p></div>;
    }
    return this.props.children;
  }
}
