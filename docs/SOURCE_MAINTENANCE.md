# Mantenimiento de Fuentes Oficiales

## Propósito

Este documento explica cómo mantener actualizada la información legal y oficial de ConsejoSeguro.

## Archivo de Fuentes: `data/official_sources.json`

Contiene TODAS las fuentes verificadas que usa la app. Ninguna información debe mostrarse al usuario sin estar referenciada aquí.

## Protocolo de Actualización Mensual

### 1. Verificar URLs Activas (Primer lunes de cada mes)

```bash
# Verificar que todos los enlaces funcionen
# Usar script o manualmente
```

**Fuentes críticas a verificar:**
  - ✅ https://welcometoserbia.gov.rs/home
  - ✅ https://www.mup.gov.rs
  - ✅ https://euprava.gov.rs
  - ✅ https://www.mpravde.gov.rs

**Si una URL ya no funciona:**
1. Buscar la nueva URL oficial
2. Actualizar `official_sources.json`
3. Actualizar todos los flujos funcionales que la referencien
4. Commit con mensaje: `fix: update [source] URL`

### 2. Revisar Cambios en Procedimientos

**Welcome to Serbia - Review Completo:**
  - Ir a https://welcometoserbia.gov.rs/home
- Revisar secciones: Residence Permits, Work, Family
- Buscar avisos de "Updated" o "New Procedure"
- Comparar con nuestros flujos funcionales

**MUP - Ministerio del Interior:**
  - Ir a https://www.mup.gov.rs
- Revisar https://www.mup.gov.rs/wps/portal/sr/dokumenti/stranci
- Verificar tasas actualizadas (a veces cambian)
- Verificar horarios de atención
- Verificar direcciones de oficinas

**Cambios comunes a revisar:**
- Tasas administrativas (pueden subir anualmente)
- Documentos requeridos (a veces añaden o quitan requisitos)
- Plazos (días para solicitar, días para resolver)
- Direcciones de oficinas

### 3. Jerarquía de Fuentes (En caso de conflicto)

Si dos fuentes dan información diferente, usar este orden:

**1. Portal oficial Welcome to Serbia** (máxima prioridad)
```
https://welcometoserbia.gov.rs/home
```

**2. Ministerio directamente responsable**
- Residencia → MUP (mup.gov.rs)
- Matrimonio → Ministerio de Justicia (mpravde.gov.rs)
- Trabajo → Ministerio de Trabajo

**3. eUprava** (generalmente actualizado)
```
https://euprava.gov.rs
```

**4. Verificación física**
- Si hay conflicto irreconciliable
- Llamar al MUP o ir personalmente
- Documentar la respuesta en `official_sources.json`

## Qué NO Usar Como Fuente

❌ **Blogs de inmigrantes**
- Pueden estar desactualizados
- Opiniones personales, no procedimientos

❌ **Grupos de Facebook/WhatsApp**
- Información anecdótica
- No verificable

❌ **Reddit / Foros**
- Útil para descubrir problemas
- Pero NO para procedimientos oficiales

❌ **Sitios de "trámites" privados**
- Pueden cobrar por info que es gratis
- A veces información incorrecta

## Actualización de Flujos Funcionales

Cuando se detecta un cambio en fuente oficial:

**Paso 1:** Actualizar `data/official_sources.json`
```json
{
  "mup": {
    "last_verified": "2025-01-15",
    "physical_locations": {
      "belgrade_foreigners": {
        "address": "Nueva dirección si cambió"
      }
    }
  }
}
```

**Paso 2:** Actualizar flujo afectado
- `docs/flows/renewal_flow_functional.md`
- `docs/flows/family_flow_functional.md`
- etc.

**Paso 3:** Commit claro
```bash
git commit -m "update: MUP address updated per official source"
```

**Paso 4:** Desplegar inmediatamente
```bash
git push origin main
```

## Verificación de Tasas (Crítico)

Las tasas pueden cambiar SIN aviso previo. Revisar:

**MUP (Residencia):**
- Solicitud: ~6000 RSD (verificar mensualmente)
- Duplicado: ~3000 RSD

**Matični Ured (Registro Civil):**
- Matrimonio: ~3000-5000 RSD
- Certificados: ~200-500 RSD

**Traducción jurada:**
- Precio de mercado: 1500-3000 RSD/página
- Verificar con Asociación de Traductores

**Cuándo actualizar:**
- Si usuarios reportan precio diferente
- Cada 3 meses revisar proactivamente

## Cambios en Ley de Extranjeros

La **Ley de Extranjeros** es la base legal (24/18, 31/19, 62/23).

**Monitorear:**
- Official Gazette: https://www.slglasnik.com
- Buscar: "Zakon o strancima" (Ley de Extranjeros)

**Si hay nueva enmienda:**
1. Leer el cambio legal
2. Esperar a que Welcome to Serbia lo refleje (1-2 meses)
3. Actualizar nuestros flujos según nueva interpretación oficial

**NO adelantarse a la interpretación oficial.**

## Directorio de Contactos Verificación

Para verificar información dudosa:

**MUP Info Centar:**
- Tel: 011/306-2-300 (días laborables 8-16h)
- Preguntar específicamente por "Odeljenje za strance"

**eUprava Help:**
- https://euprava.gov.rs/usluge/kontakt
- Email: euprava@euprava.gov.rs

**Embajadas (para info de tu país):**
- Buscar en Google: "Embajada de [país] en Serbia"

## Registro de Cambios Importantes

Mantener log en `official_sources.json` → `metadata` → `change_log`:

```json
{
  "metadata": {
    "change_log": [
      {
        "date": "2025-01-15",
        "change": "MUP Belgrade address updated",
        "source": "https://www.mup.gov.rs",
        "affected_flows": ["renewal", "family"]
      }
    ]
  }
}
```

## Responsabilidades

**Mensual:**
- [ ] Verificar URLs activas
- [ ] Revisar Welcome to Serbia por cambios
- [ ] Verificar tasas en MUP
- [ ] Actualizar `last_verified` en JSON

**Trimestral:**
- [ ] Revisar todos los flujos funcionales
- [ ] Verificar física (ir a MUP si es posible)
- [ ] Actualizar precios de mercado (traducción, etc.)

**Anual:**
- [ ] Revisar Official Gazette por cambios legales
- [ ] Auditoría completa de todas las fuentes

## Flujo de Corrección de Usuario

Si un usuario reporta información incorrecta:

**Paso 1:** Verificar inmediatamente
- Ir a fuente oficial
- Confirmar si el usuario tiene razón

**Paso 2:** Actualizar en menos de 24h
- `official_sources.json`
- Flujo afectado
- Commit + push

**Paso 3:** Agradecer al usuario
- Documentar en changelog

## Principio Fundamental

> **"Solo fuentes oficiales del Gobierno de Serbia o verificadas físicamente."**

Si no podemos verificar algo oficialmente, mejor:
1. NO mostrarlo como hecho
2. Decir "consulta en [oficina oficial]"
3. NO improvisar ni usar info de terceros

---

**Última actualización de este documento:** 2024-12-24  
**Próxima revisión obligatoria:** 2025-01-24
