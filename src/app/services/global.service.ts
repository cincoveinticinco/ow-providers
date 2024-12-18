import { Injectable } from '@angular/core';
import { CrewService } from './crew.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public nationalities = [
    'Colombiano-A',
    'Abjasio-A',
    'Acrotirense',
    'Afgano-A',
    'Albanés-Sa',
    'Alemán-Na',
    'Andorrano-A',
    'Angoleño-A',
    'Anguilense',
    'Antiguano-A',
    'Argelino-A',
    'Argentino-A',
    'Armenio-A',
    'Artsají',
    'Arubeño-A',
    'Australiano-A',
    'Austriaco-A',
    'Azerbaiyano-A',
    'Bahameño-A',
    'Bangladesí',
    'Barbadense',
    'Bareiní',
    'Belga',
    'Beliceño-A',
    'Beninés-Sa',
    'Bermudeño-A',
    'Bielorruso-A',
    'Birmano-A',
    'Boliviano-A',
    'Bosnio-A',
    'Botsuano-A',
    'Brasileño-A',
    'Británico-A',
    'Bruneano-A',
    'Burkinés-Sa',
    'Burundés-Sa',
    'Butanés-Sa',
    'Búlgaro-A',
    'Caboverdiano-A',
    'Caimanés',
    'Camboyano-A',
    'Camerunés-Sa',
    'Canadiense',
    'Catarí',
    'Ceilanés-Sa',
    'Centroafricano-A',
    'Chadiano-A',
    'Chamorro-A',
    'Checo-A',
    'Chileno-A',
    'Chino-A',
    'Chipriota',
    'Cocano-A',
    'Comorense',
    'Congoleño-A',
    'Cookiano-A',
    'Costarricense',
    'Croata',
    'Cubano-A',
    'Curazoleño-A',
    'Danés-Sa',
    'Dhekeliano',
    'Dominicano-A',
    'Dominiqués-Sa',
    'Ecuatoriano-A',
    'Egipcio-A',
    'Emiratí',
    'Eritreo-A',
    'Eslovaco-A',
    'Esloveno-A',
    'Español-La',
    'Estadounidense',
    'Estonio-A',
    'Etíope',
    'Feroés-Sa',
    'Filipino-A',
    'Finlandés-Sa',
    'Fiyiano-A',
    'Francopolinesio-A',
    'Francés-Sa',
    'Gabonés-Sa',
    'Gambiano-A',
    'Georgiano-A',
    'Ghanés-Sa',
    'Gibraltareño-A',
    'Granadino-A',
    'Griego-A',
    'Groenlandés-Sa',
    'Guameño-A',
    'Guatemalteco-A',
    'Guerneseyés-Sa',
    'Guineano-A',
    'Guyanés-Sa',
    'Haitiano-A',
    'Hondureño-A',
    'Hongkonés-Sa',
    'Húngaro-A',
    'Indio-A',
    'Indonesio-Sia',
    'Iraní',
    'Iraquí',
    'Irlandés-Sa',
    'Islandés-Sa',
    'Israelí',
    'Italiano-A',
    'Jamaicano-A',
    'Japonés-Sa',
    'Jerseyés-Sa',
    'Jordano-A',
    'Kazajo-A',
    'Keniano-A',
    'Kirguís',
    'Kiribatiano-A',
    'Kosovar',
    'Kuwaití',
    'Laosiano-A',
    'Lesotense',
    'Letón-Na',
    'Libanés-Sa',
    'Liberiano-A',
    'Libio-A',
    'Liechtensteiniano-A',
    'Lituano-A',
    'Luxemburgués-Sa',
    'Macaense',
    'Macedonio-A',
    'Malasio-A',
    'Malauí',
    'Maldivo-A',
    'Malgaches',
    'Maliense',
    'Maltés-Sa',
    'Malvinense',
    'Manés-Sa',
    'Marfileño-A',
    'Marroquí',
    'Marshalés-Sa',
    'Mauriciano-A',
    'Mauritano-A',
    'Mexicano-A',
    'Micronesio-A',
    'Moldavo-A',
    'Monegasco-A',
    'Mongol-La',
    'Monserratino-A',
    'Montenegrino-A',
    'Mozambiqueño-A',
    'Namibio-A',
    'Nauruano-A',
    'Navideño-A',
    'Neerlandés-Sa',
    'Neocaledonio-A',
    'Neorruso',
    'Neozelandés-Sa',
    'Nepalés-Sa',
    'Nicaragüense',
    'Nigeriano-A',
    'Nigerino-A',
    'Niueño-A',
    'Norchipriota',
    'Norcoreano-A',
    'Norfolkense',
    'Noruego-A',
    'Omaní',
    'Pakistaní',
    'Palauano-A',
    'Palestino-A',
    'Panameño-A',
    'Papú',
    'Paraguayo-A',
    'Peruano-A',
    'Pitcairnés-Sa',
    'Polaco-A',
    'Portugués-Sa',
    'Puertorriqueño-A',
    'Ruandés-Sa',
    'Rumano-A',
    'Ruso-A',
    'Saharaui',
    'Salomonense',
    'Salvadoreño-A',
    'Samoamericano-A',
    'Samoano-A',
    'Sanbartolomeano-A',
    'Sancristobaleño-A',
    'Sanmarinense',
    'Sanmartitense',
    'Sanpedrino-A',
    'Santaheleno-A',
    'Santalucense',
    'Santotomense',
    'Sanvicentino-A',
    'Saudí',
    'Senegalés-Sa',
    'Serbio-A',
    'Seychellense',
    'Sierraleonés-Sa',
    'Singapurense',
    'Sirio-A',
    'Somalilandés-Sa',
    'Somalí',
    'Suazi',
    'Sudafricano-A',
    'Sudanés-Sa',
    'Sueco-A',
    'Suizo-A',
    'Surcoreano-A',
    'Surinamés-Sa',
    'Surosetio-A',
    'Sursudanés-Sa',
    'Svalbarense',
    'Tailandés-Sa',
    'Taiwanés-Sa',
    'Tanzano-A',
    'Tayiko-A',
    'Timorense',
    'Togolés-Sa',
    'Tokelauense',
    'Tongano-A',
    'Transnistrio-A',
    'Trinitense',
    'Tunecino-A',
    'Turco-A',
    'Turcocaiqueño-A',
    'Turcomano-A',
    'Tuvaluano-A',
    'Ucraniano-A',
    'Ugandés-Sa',
    'Uruguayo-A',
    'Uzbeko-A',
    'Vanuatuense',
    'Vaticano-A',
    'Venezolano-A',
    'Vietnamita',
    'Virgenense Británico-A',
    'Virgenense Estadounidense',
    'Walisiano-A',
    'Yemení',
    'Yibutiano-A',
    'Zambiano-A',
    'Zimbabuense',
  ];

  setInitialFormMx(typePerson: any, data: any) {
    var formData = {
      crew_id: this._cS.getCrewId(),
      f_document_type_id: data['f_document_type_id'],
      name: data['name'],
      document: data['document'],
      nationality: data['pais'] != "0" ? data['pais'] : null,
      telephone: data['telefono'],
      address: data['direccion'],
      population: data['colonia'],
      f_public_admin_mex_type_id: data['alcaldia'],
      department: data['department'],
      artistic_name: data['artistic_name'],
      city: data['ciudad'],
      info_add_address: data['codigo_postal'],
      birth_date: data['fecha_nacimiento'],
      genders_id: data['genero_id'] != "0" ? data['genero_id'] : null,
      manager_name: data['manager_name'],
      manager_email: data['manager_email'],
      manager_telephone: data['manager_telephone'],
      manager_document: data['manager_document'],
      company_name: data['company_name'],
      company_document: data['company_document'],
      info_additional: [
        {
          "vendor_inf_add_type_id": 12, // Madre padre
          "value": data[('madre_padre')],
          "description": data[('madre_padre_description')]  // description
        },
        {
          "vendor_inf_add_type_id": 14, // Información futura 100
          "value": data[('informacion_futura')]
        },
        {
          "vendor_inf_add_type_id": 16, // Datos otros 103
          "value": data[('datos_otros')]
        },
        {
          "vendor_inf_add_type_id": 17, // Permisos eventos 101
          "value": data[('permisos_eventos')]
        },
        {
          "vendor_inf_add_type_id": 18, // Vinculo
          "value": data[('vinculo')],
          "description": data[('vinculo_description')]
        },
        {
          "vendor_inf_add_type_id": 20, // Relación
          "value": data[('relacion')],
          "description": data[('relacion_description')]
        },
        {
          "vendor_inf_add_type_id": 23, // Restricción
          "value": data[('restriccion')],
          "description": data[('restriccion_description')]
        },
        {
          "vendor_inf_add_type_id": 24, // alergia
          "value": data[('alergia')],
          "description": data[('alergia_description')]
        },
        {
          "vendor_inf_add_type_id": 26, // Autorización de medios 102
          "value": data[('autorizacion_media')]
        },
        {
          "vendor_inf_add_type_id": 104, // Verificacion datos, nuevo campo
          "value": data[('verificacion_datos')],
        },
        {
          "vendor_inf_add_type_id": 105, // REPSE
          "value": data[('repse')],
          "description": data[('repse_register_description')]
        },
        {
          "vendor_inf_add_type_id": 50,
          "value": data[('lr_actor')],
        },
      ],
      emergency_contact_name: data[('nombre_emergencia')],
      emergency_contact_telephone: data[('telefono_emergencia')],
      blood_type_id: data[('grupo_sanguineo')] != "0" ? data[('grupo_sanguineo')] : null,
      occupation: data[('profesion')], // verificar
      bank_branch: data[('nombre_banco')],
      bank_key: data[('numero_cuenta')],
      account_clabe: data[('cuenta_clabe')], // NO EXISTE LLAVE
      f_contractor_regime_types_id: data[('regimen_fiscal')],
      // Moral person extra data

      vendor_economic: data[('actividad_empresa')],
      legal_representatives_name: data[('representante_legal')] || null,
      city_representative: data[('f_nacionalidad_representative')] || null,
      f_document_representative: data[('f_document_representative')] || null,
      lr_actor: data['lr_actor'] || null,
      responsible_responsibles_name: data[('persona_servicio_name_description')] || null,
      responsible_responsibles_document: data[('responsible_responsibles_document')],
      responsible_city: data[('persona_servicio_nacionalidad_description')],
      responsible_responsibles_email: data[('persona_servicio_email_description')],
      responsible_responsibles_telephone: data[('responsible_responsibles_telephone')],
    }
    return formData
  }

  setInitialForm(typePerson: any, data: any) {
    var formData = {
      crew_id: this._cS.getCrewId(),
      name: data['name'],
      f_vendor_type_id: typePerson,
      document: data['document'],
      country_id: data['pais_id'] != "0" ? data['pais_id'] : null,
      expedition_place: data['lugar_expedicion'],
      f_vendor_economic_act_id: data['actividad_economica_id'] != "0" ? data['actividad_economica_id'] : null,
      d_industry_id: data['industria_id'] != "0" ? data['industria_id'] : null,
      d_jurisdiction_id: data['jurisdiccion_id'] != "0" ? data['jurisdiccion_id'] : null,
      nationality: data['nacionalidad'],
      ciiu: data['ciiu'],
      legal_representatives_name: data['representante_legal'],
      f_document_representative: data['f_document_representative'],
      city_representative: data['city_representative'],
      responsible_responsibles_name: data['responsible_responsibles_name'],
      responsible_responsibles_document: data['responsible_responsibles_document'],
      responsible_responsibles_email: data['responsible_responsibles_email'],
      responsible_f_document_type_id: data['responsible_f_document_type_id'],
      pep: data['pep'],
      pep_description: data['pep_description'],
      actor_pep: data['actor_pep'],
      actor_name: data['actor_name'],
      actor_document: data['actor_document'],
      manager_name: data['manager_name'],
      manager_email: data['manager_email'],
      manager_telephone: data['manager_telephone'],
      actor_pep_description: data['actor_pep_description'],
      lr_actor: data['lr_actor'],
      telephone: data['telefono'],
      address: data['direccion'],
      bank_key: data['numero_cuenta'],
      bank_branch: data['nombre_banco'],
      bank_account_type_id: data['type_cuenta_id'],
      f_contractor_regime_types_id: data['type_regimen_id'],
      requires_external_staff: data['requires_external_staff'],
      employees_number: data['employees_number'],
      f_document_type_id: data['document_type_id'],
    }
    return formData;
  }

  setVinculationForm(data: any) {
    var formData = {
      crew_id: this._cS.getCrewId(),
      artistic_name: data[('artistic_name')],
      birth_date: data[('fecha_nacimiento')],
      nationality: data[('nacionalidad')],
      genders_id: data[('genero_id')] != "0" ? data[('genero_id')] : null,
      address: data[('direccion')],
      city: data[('ciudad')],
      telephone: data[('telefono')],
      eps: data[('eps')],
      afp: data[('pension')],
      children_number: data[('madre_padre_description')],
      occupation: data[('profesion')],
      emergency_contact_name: data[('nombre_emergencia')],
      emergency_contact_telephone: data[('telefono_emergencia')],
      bank_branch: data[('nombre_banco')],
      bank_key: data[('numero_cuenta')],
      f_payment_regime_methods_id: data[('pago_medio_id')] != "0" ? data[('pago_medio_id')] : null,
      blood_type_id: data[('grupo_sanguineo')] != "0" ? data[('grupo_sanguineo')] : null,
      bank_account_type_id: data[('type_cuenta_id')] != "0" ? data[('type_cuenta_id')] : null,
      occupational_risk_administrators_id: data[('arl_id')] != "0" ? data[('arl_id')] : null,
      f_type_contributing_epses_id: data[('eps_id')] != "0" ? data[('eps_id')] : null,
      f_contractor_regime_types_id: data[('type_regimen_id')] != "0" ? data[('type_regimen_id')] : null,
      f_type_of_company_regimes_id: data[('type_crew_id')] != "0" ? data[('type_crew_id')] : null,

      info_additional: [
        {
          "vendor_inf_add_type_id": 12,
          "value": data[('madre_padre')]
        },
        {
          "vendor_inf_add_type_id": 13,
          "value": data[('mascota')]
        },
        {
          "vendor_inf_add_type_id": 14,
          "value": data[('informacion_futura')]
        },
        {
          "vendor_inf_add_type_id": 15,
          "value": data[('permisos_entidades')]
        },
        {
          "vendor_inf_add_type_id": 16,
          "value": data[('datos_otros')]
        },
        {
          "vendor_inf_add_type_id": 17,
          "value": data[('permisos_eventos')]
        },
        {
          "vendor_inf_add_type_id": 18,
          "value": data[('vinculo')],
          "description": data[('vinculo_description')]
        },
        {
          "vendor_inf_add_type_id": 20,
          "value": data[('relacion')],
          "description": data[('relacion_description')]
        },
        {
          "vendor_inf_add_type_id": 23,
          "value": data[('restriccion')],
          "description": data[('restriccion_description')]
        },
        {
          "vendor_inf_add_type_id": 24,
          "value": data[('alergia')],
          "description": data[('alergia_description')]
        },
        {
          "vendor_inf_add_type_id": 26,
          "value": data[('autorizacion_media')]
        },
        {
          "vendor_inf_add_type_id": 27,
          "value": data[('payroll')],
          "description": data[('payroll_description')]
        },
        {
          "vendor_inf_add_type_id": 58,
          "value": data[('informacion_futura_actor')]
        },
        {
          "vendor_inf_add_type_id": 59,
          "value": data[('autorizacion_media_actor')]
        },
        {
          "vendor_inf_add_type_id": 60,
          "value": data[('permisos_entidades_actor')]
        },
        {
          "vendor_inf_add_type_id": 61,
          "value": data[('datos_otros_actor')]
        },
        {
          "vendor_inf_add_type_id": 62,
          "value": data[('permisos_eventos_actor')]
        },
        {
          "vendor_inf_add_type_id": 63,
          "value": data[('vinculo_actor')],
          "description": data[('vinculo_description_actor')]
        },
        {
          "vendor_inf_add_type_id": 65,
          "value": data[('relacion_actor')],
          "description": data[('relacion_description_actor')]
        },
        {
          "vendor_inf_add_type_id": 75,
          "value": data[('requirements')],
        },
        {
          "vendor_inf_add_type_id": 76,
          "value": data[('data_verification')],
        },
        {
          "vendor_inf_add_type_id": 77,
          "value": data[('pec')],
        },
        {
          "vendor_inf_add_type_id": 70,
          "value": data[('ethics_manual')],
        },
        {
          "vendor_inf_add_type_id": 71,
          "value": data[('anti_corruption')],
          "description": data[('anti_corruption_description')]
        },
        {
          "vendor_inf_add_type_id": 72,
          "value": data[('good_faith')],
        },
        {
          "vendor_inf_add_type_id": 73,
          "value": data[('oath')],
        },
        {
          "vendor_inf_add_type_id": 74,
          "value": data[('third_parties')],
        },
        {
          "vendor_inf_add_type_id": 78,
          "value": data['poliza'],
        },
      ]
    }
    return formData;
  }

  setEditInitialForm(form: any, crew: any) {
    form.get('name')?.setValue(crew?.name || '');
    form.get('document_type_id')?.setValue(crew?.f_document_type_id || 0);
    form.get('document')?.setValue(crew?.document || '');
    form.get('lugar_expedicion')?.setValue(crew?.expedition_place || '');
    form.get('nacionalidad')?.setValue(crew?.nationality || '');
    form.get('pais_id')?.setValue(crew?.country_id || 0);
    form.get('jurisdiccion_id')?.setValue(crew?.d_jurisdiction_id || 0);
    form.get('actividad_economica_id')?.setValue(crew?.f_vendor_economic_act_id || 0);
    form.get('industria_id')?.setValue(crew?.d_industry_id || 0);
    form.get('pep')?.setValue(crew?.pep ? "1" : "0");
    form.get('pep_description')?.setValue(crew?.pep_description || '');
    form.get('representante_legal')?.setValue(crew?.legal_representative_name || '');
    form.get('f_document_representative')?.setValue(crew?.legal_representative_document || '');
    form.get('city_representative')?.setValue(crew?.city_representative || '');
    form.get('responsible_responsibles_name')?.setValue(crew?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(crew?.responsible_responsibles_document || '');
    form.get('responsible_responsibles_email')?.setValue(crew?.responsible_responsibles_email || '');
    form.get('responsible_f_document_type_id')?.setValue(crew?.responsible_f_document_type_id || '');
    form.get('documento_identificacion')?.setValue(this.getDocumentLink(28));
    form.get('documento_identificacion_empresa')?.setValue(this.getDocumentLink(40));
    form.get('rut')?.setValue(this.getDocumentLink(35));
    form.get('rut_vendors')?.setValue(this.getDocumentLink(167));
    form.get('documento_identificacion_vendors')?.setValue(this.getDocumentLink(168));
    form.get('actor_pep')?.setValue(crew?.actor_pep ? "1" : "0");
    form.get('lr_actor')?.setValue(crew?.lr_actor_value ? "1" : "0");
    form.get('actor_name')?.setValue(crew?.actor_name || '');
    form.get('actor_document')?.setValue(crew?.actor_document || '');
    form.get('manager_name')?.setValue(crew?.manager_name || '');
    form.get('manager_email')?.setValue(crew?.manager_email || '');
    form.get('manager_telephone')?.setValue(crew?.manager_telephone || '');
    form.get('actor_pep_description')?.setValue(crew?.actor_pep_description || '');
    form.get('documento_identificacion_actor')?.setValue(this.getDocumentLink(303));
    form.get('direccion')?.setValue(crew?.address || '');
    form.get('telefono')?.setValue(crew?.telephone || '');
    form.get('nombre_banco')?.setValue(crew?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(crew?.bank_key || '');
    form.get('type_cuenta_id')?.setValue(crew?.f_vendor_bank_account_type_id || '');
    form.get('type_regimen_id')?.setValue(crew?.f_contractor_regime_types_id || '');
    form.get('requires_external_staff')?.setValue(crew?.requires_external_staff ? "1" : "0");
    form.get('employees_number')?.setValue(crew?.employees_number || '');


    if (form.get('ciiu')) {
      crew?.ciiu?.forEach((ciiu: any) => {
        this.addCiiu(form, ciiu);
      });

      if (form.get('ciiu')?.value?.length == 0) {
        this.addCiiu(form, '');
      }
    }
  }

  addCiiu(form: FormGroup, ciiu: any) {
    const control = new FormControl(ciiu?.ciiu || '', Validators.pattern('^[0-9]*$'));
    (<FormArray>form.get('ciiu')).push(control);
  }

  setEditMxInitialForm(form: any, crew: any, crewAnswers: any[]) {
    form.get('name')?.setValue(crew?.name || '');
    form.get('actividad_empresa')?.setValue(crew?.vendor_economic || '');
    form.get('f_document_type_id')?.setValue(crew?.f_document_type_id || 0);
    form.get('document')?.setValue(crew?.document || '');
    form.get('telefono')?.setValue(crew?.telephone || '');
    form.get('f_nacionalidad_representative')?.setValue(crew?.city_representative|| '');
    form.get('direccion')?.setValue(crew?.address || '');
    form.get('colonia')?.setValue(crew?.population || '');
    form.get('pais_id')?.setValue(crew?.country_id || 0);
    form.get('pais')?.setValue(crew?.nationality || 0);
    form.get('jurisdiccion_id')?.setValue(crew?.d_jurisdiction_id || 0);
    form.get('actividad_economica_id')?.setValue(crew?.f_vendor_economic_act_id || 0);
    form.get('industria_id')?.setValue(crew?.d_industry_id || 0);
    form.get('representante_legal')?.setValue(crew?.legal_representative_name || '');
    form.get('f_document_representative')?.setValue(crew?.legal_representative_document || '');
    form.get('alcaldia')?.setValue(crew?.f_public_admin_mex_type_id || '');
    form.get('department')?.setValue(crew?.department || '');
    form.get('artistic_name')?.setValue(crew?.actor_artistic_name || '');
    form.get('ciudad')?.setValue(crew?.city || '');
    form.get('city_representative')?.setValue(crew?.city_representative || '');
    form.get('responsible_responsibles_name')?.setValue(crew?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(crew?.responsible_responsibles_document || '');
    form.get('responsible_responsibles_email')?.setValue(crew?.responsible_responsibles_email || '');
    form.get('responsible_f_document_type_id')?.setValue(crew?.responsible_f_document_type_id || '');
    form.get('persona_servicio_email_description')?.setValue(crew?.responsible_responsibles_email || '');
    form.get('responsible_responsibles_telephone')?.setValue(crew?.responsible_telephone || '');
    form.get('documento_identificacion')?.setValue(this.getDocumentLink(28));
    form.get('documento_identificacion_empresa')?.setValue(this.getDocumentLink(40));
    form.get('codigo_postal')?.setValue(crew?.info_add_address || '');
    form.get('nombre_banco')?.setValue(crew?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(crew?.bank_key || '');
    form.get('cuenta_clabe')?.setValue(crew?.account_clabe || '');
    form.get('regimen_fiscal')?.setValue(crew?.f_contractor_regime_types_id || '');
    form.get('persona_servicio_name_description')?.setValue(crew?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(crew?.responsible_responsibles_document || '');
    form.get('persona_servicio_nacionalidad_description')?.setValue(crew?.responsible_city || '');
    form.get('fecha_nacimiento')?.setValue(crew?.birth_date || '');
    form.get('genero_id')?.setValue(crew?.genders_id || 0);
    form.get('nombre_emergencia')?.setValue(crew?.emergency_contact_name || '');
    form.get('telefono_emergencia')?.setValue(crew?.emergency_contact_telephone || '');
    form.get('grupo_sanguineo')?.setValue(crew?.blood_type_id || '');
    form.get('profesion')?.setValue(crew?.occupation || '');
    form.get('manager_email')?.setValue(crew?.manager_email || '');
    form.get('manager_telephone')?.setValue(crew?.manager_telephone || '');
    form.get('manager_name')?.setValue(crew?.manager_name || '');
    form.get('manager_document')?.setValue(crew?.manager_document || '');
    form.get('company_name')?.setValue(crew?.company_name || '');
    form.get('company_document')?.setValue(crew?.company_document || '');
    form.get('actividad_empresa')?.setValue(crew?.vendor_economic || '');
    form.get('has_manager')?.setValue((crew?.manager_name || crew?.manager_document || crew?.manager_telephone || crew?.manager_email) ? '1' : '0');
    // yes or not
    form.get('repse_register_description')?.setValue(this.getDescription(105, crewAnswers));
    form.get('repse')?.setValue(this.getQuestionData(105, crewAnswers, 'repse', form));
    form.get('lr_actor')?.setValue(this.getQuestionData(50, crewAnswers, 'lr_actor', form));
    form.get('fecha_nacimiento')?.setValue(crew?.birth_date || '');
    form.get('alergia')?.setValue(this.getQuestionData(24, crewAnswers, 'alergia', form));
    form.get('alergia_description')?.setValue(this.getDescription(24, crewAnswers));
    form.get('restriccion')?.setValue(this.getQuestionData(23, crewAnswers, 'restriccion', form));
    form.get('restriccion_description')?.setValue(this.getDescription(23, crewAnswers));
    form.get('madre_padre')?.setValue(this.getQuestionData(12, crewAnswers, 'madre_padre', form));
    form.get('madre_padre_description')?.setValue(this.getDescription(12, crewAnswers));
    form.get('vinculo')?.setValue(this.getQuestionData(18, crewAnswers, 'vinculo', form));
    form.get('vinculo_description')?.setValue(this.getDescription(18, crewAnswers));
    form.get('relacion')?.setValue(this.getQuestionData(20, crewAnswers, 'relacion', form));
    form.get('relacion_description')?.setValue(this.getDescription(20, crewAnswers));
    form.get('informacion_futura')?.setValue(this.getQuestionData(14, crewAnswers, 'informacion_futura', form));
    form.get('datos_otros')?.setValue(this.getQuestionData(16, crewAnswers, 'datos_otros', form));
    form.get('permisos_entidades')?.setValue(this.getQuestionData(15, crewAnswers, 'permisos_entidades', form));
    form.get('permisos_eventos')?.setValue(this.getQuestionData(17, crewAnswers, 'permisos_eventos', form));
    form.get('autorizacion_media')?.setValue(this.getQuestionData(26, crewAnswers));
    form.get('verificacion_datos')?.setValue(this.getQuestionData(104, crewAnswers));
  }

  setEditVinculationForm(form: any, crew: any, crewAnswers: any[]) {
    form.get('artistic_name')?.setValue(crew?.actor_artistic_name || '');
    form.get('fecha_nacimiento')?.setValue(crew?.birth_date || '');
    form.get('nacionalidad')?.setValue(crew?.nationality || '');
    form.get('genero_id')?.setValue(crew?.genders_id || 0);
    form.get('direccion')?.setValue(crew?.address || '');
    form.get('ciudad')?.setValue(crew?.city || '');
    form.get('telefono')?.setValue(crew?.telephone || '');
    form.get('eps')?.setValue(crew?.eps || '');
    form.get('pension')?.setValue(crew?.afp || '');
    form.get('madre_padre_description')?.setValue(crew?.children_number || '');
    form.get('profesion')?.setValue(crew?.occupation || '');
    form.get('nombre_banco')?.setValue(crew?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(crew?.bank_key || '');
    form.get('pago_medio_id')?.setValue(crew?.f_payment_regime_methods_id || '');
    form.get('grupo_sanguineo')?.setValue(crew?.blood_type_id || '');
    form.get('arl_id')?.setValue(crew?.occupational_risk_administrators_id || '');
    form.get('type_regimen_id')?.setValue(crew?.f_contractor_regime_types_id || '');
    form.get('type_crew_id')?.setValue(crew?.f_type_of_company_regimes_id || '');
    form.get('nombre_emergencia')?.setValue(crew?.emergency_contact_name || '');
    form.get('telefono_emergencia')?.setValue(crew?.emergency_contact_telephone || '');
    form.get('eps_id')?.setValue(crew?.f_type_contributing_epses_id || '');
    form.get('type_cuenta_id')?.setValue(crew?.f_vendor_bank_account_type_id || '');
    //yes or no
    form.get('madre_padre')?.setValue(this.getQuestionData(12, crewAnswers));
    form.get('mascota')?.setValue(this.getQuestionData(13, crewAnswers));
    form.get('informacion_futura')?.setValue(this.getQuestionData(14, crewAnswers));
    form.get('permisos_entidades')?.setValue(this.getQuestionData(15, crewAnswers));
    form.get('datos_otros')?.setValue(this.getQuestionData(16, crewAnswers));
    form.get('permisos_eventos')?.setValue(this.getQuestionData(17, crewAnswers));
    form.get('poliza')?.setValue(this.getQuestionData(78, crewAnswers, 'poliza', form));
    form.get('vinculo')?.setValue(this.getQuestionData(18, crewAnswers, 'vinculo', form));
    form.get('vinculo_description')?.setValue(this.getDescription(18, crewAnswers));
    form.get('relacion')?.setValue(this.getQuestionData(20, crewAnswers, 'relacion', form));
    form.get('relacion_description')?.setValue(this.getDescription(20, crewAnswers));
    form.get('requirements')?.setValue(this.getQuestionData(75, crewAnswers, 'requirements', form));
    form.get('data_verification')?.setValue(this.getQuestionData(76, crewAnswers, 'data_verification', form));
    form.get('pec')?.setValue(this.getQuestionData(77, crewAnswers, 'pec', form));
    form.get('anti_corruption')?.setValue(this.getQuestionData(71, crewAnswers, 'anti_corruption', form));
    form.get('anti_corruption_description')?.setValue(this.getDescription(71, crewAnswers));
    form.get('ethics_manual')?.setValue(this.getQuestionData(70, crewAnswers, 'ethics_manual', form));
    form.get('good_faith')?.setValue(this.getQuestionData(72, crewAnswers, 'good_faith', form));
    form.get('oath')?.setValue(this.getQuestionData(73, crewAnswers, 'oath', form));
    form.get('third_parties')?.setValue(this.getQuestionData(74, crewAnswers, 'third_parties', form));
    form.get('restriccion')?.setValue(this.getQuestionData(23, crewAnswers, 'restriccion', form));
    form.get('restriccion_description')?.setValue(this.getDescription(23, crewAnswers));
    form.get('alergia')?.setValue(this.getQuestionData(24, crewAnswers, 'alergia', form));
    form.get('alergia_description')?.setValue(this.getDescription(24, crewAnswers));
    form.get('autorizacion_media')?.setValue(this.getQuestionData(26, crewAnswers));
    form.get('payroll')?.setValue(this.getQuestionData(27, crewAnswers, 'payroll', form));
    form.get('payroll_description')?.setValue(this.getDescription(27, crewAnswers));
    form.get('informacion_futura_actor')?.setValue(this.getQuestionData(58, crewAnswers, 'informacion_futura_actor', form));
    form.get('autorizacion_media_actor')?.setValue(this.getQuestionData(59, crewAnswers, 'autorizacion_media_actor', form));
    form.get('permisos_entidades_actor')?.setValue(this.getQuestionData(60, crewAnswers, 'permisos_entidades_actor', form));
    form.get('datos_otros_actor')?.setValue(this.getQuestionData(61, crewAnswers, 'datos_otros_actor', form));
    form.get('permisos_eventos_actor')?.setValue(this.getQuestionData(62, crewAnswers, 'permisos_eventos_actor', form));
    form.get('vinculo_actor')?.setValue(this.getQuestionData(63, crewAnswers, 'vinculo_actor', form));
    form.get('vinculo_description_actor')?.setValue(this.getDescription(63, crewAnswers));
    form.get('relacion_actor')?.setValue(this.getQuestionData(65, crewAnswers, 'vinculo_actor', form));
    form.get('relacion_description_actor')?.setValue(this.getDescription(65, crewAnswers));
  }

  getQuestionData(id: any, answers: any[], controlName?: string, form?: any) {
    const answer = answers.find((an: any) => an.id == id);

    if (!answer) return null;

    if (answer.value === true && controlName) {
      form.get(`${controlName}_description`)?.setValidators(Validators.required);
    }
    else if (answer.value !== true && controlName){
      form.get(`${controlName}_description`)?.removeValidators(Validators.required);
    }

    if (answer) return answer.value === true ? "1" : (answer.value === false ? "0" : null);
    else return null;
  }

  getDescription(id: any, answers: any[]) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer) return answer.description ? answer.description : null;
    else return null;
  }

  getDocumentLink(id: any) {
    let documentsList = this._cS.getDocumentsList();
    let document = documentsList.find((dl: any) => dl.id == id);
    const file = document?.link ? { name: document.link, url: document.link, document_id: document?.document_id } : null;
    return file;
  }

  normalizeString(strAccents:string) {
    return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  openSnackBar(message: string, action: string = 'X', duration: number = 10000) {
		this._snackBar.open(message, action, {
			duration: duration,
		});
	}

  constructor(private _cS: CrewService, private _snackBar: MatSnackBar) { }
}
