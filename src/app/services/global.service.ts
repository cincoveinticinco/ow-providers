import { Injectable } from '@angular/core';
import { VendorService } from './vendor.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Countries } from '../shared/Interfaces/company_centers';
import { withoutSpacesPoints } from '../shared/validators/without-spaces-points.validator';
import { onlyNumbersValidator } from '../shared/validators/only-numbers.validator';
import { lettersAndNumbersValidator } from '../shared/validators/only-letters-numbers.validator';

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
      vendor_id: this._cS.getVendorId(),
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
          "answer": data[('madre_padre')],
          "description": data[('madre_padre_description')]  // description
        },
        {
          "vendor_inf_add_type_id": 14, // Información futura 100
          "answer": data[('informacion_futura')]
        },
        {
          "vendor_inf_add_type_id": 16, // Datos otros 103
          "answer": data[('datos_otros')]
        },
        {
          "vendor_inf_add_type_id": 17, // Permisos eventos 101
          "answer": data[('permisos_eventos')]
        },
        {
          "vendor_inf_add_type_id": 18, // Vinculo
          "answer": data[('vinculo')],
          "description": data[('vinculo_description')]
        },
        {
          "vendor_inf_add_type_id": 20, // Relación
          "answer": data[('relacion')],
          "description": data[('relacion_description')]
        },
        {
          "vendor_inf_add_type_id": 23, // Restricción
          "answer": data[('restriccion')],
          "description": data[('restriccion_description')]
        },
        {
          "vendor_inf_add_type_id": 24, // alergia
          "answer": data[('alergia')],
          "description": data[('alergia_description')]
        },
        {
          "vendor_inf_add_type_id": 26, // Autorización de medios 102
          "answer": data[('autorizacion_media')]
        },
        {
          "vendor_inf_add_type_id": 104, // Verificacion datos, nuevo campo
          "answer": data[('verificacion_datos')],
        },
        {
          "vendor_inf_add_type_id": 105, // REPSE
          "answer": data[('repse')],
          "description": data[('repse_register_description')]
        },
        {
          "vendor_inf_add_type_id": 50,
          "answer": data[('lr_actor')],
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
      vendor_id: this._cS.getVendorId(),
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
      verification_digit: data['verification_digit'],
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

  setVinculationForm(data: any, save_and_send?: boolean) {
    var formData = {
      fm_request_po_id: data?.fm_request_po_id,
      save_and_send: !!save_and_send,
      bank_details: {
        bank_account_type_id: data?.type_cuenta_id,
        bank_branch: data?.nombre_banco,
        bank_key: data?.numero_cuenta,
      },

      questions: [
        {
          "id": 12,
          "answer": data[('madre_padre')]
        },
        {
          "id": 13,
          "answer": data[('mascota')]
        },
        {
          "id": 14,
          "answer": data[('informacion_futura')]
        },
        {
          "id": 15,
          "answer": data[('permisos_entidades')]
        },
        {
          "id": 16,
          "answer": data[('datos_otros')]
        },
        {
          "id": 17,
          "answer": data[('permisos_eventos')]
        },
        {
          "id": 18,
          "answer": data[('vinculo')],
          "description": data[('vinculo_description')]
        },
        {
          "id": 20,
          "answer": data[('relacion')],
          "description": data[('relacion_description')]
        },
        {
          "id": 23,
          "answer": data[('restriccion')],
          "description": data[('restriccion_description')]
        },
        {
          "id": 24,
          "answer": data[('alergia')],
          "description": data[('alergia_description')]
        },
        {
          "id": 26,
          "answer": data[('autorizacion_media')]
        },
        {
          "id": 27,
          "answer": data[('payroll')],
          "description": data[('payroll_description')]
        },
        {
          "id": 58,
          "answer": data[('informacion_futura_actor')]
        },
        {
          "id": 59,
          "answer": data[('autorizacion_media_actor')]
        },
        {
          "id": 60,
          "answer": data[('permisos_entidades_actor')]
        },
        {
          "id": 61,
          "answer": data[('datos_otros_actor')]
        },
        {
          "id": 62,
          "answer": data[('permisos_eventos_actor')]
        },
        {
          "id": 63,
          "answer": data[('vinculo_actor')],
          "description": data[('vinculo_description_actor')]
        },
        {
          "id": 65,
          "answer": data[('relacion_actor')],
          "description": data[('relacion_description_actor')]
        },
        {
          "id": 75,
          "answer": data[('requirements')],
        },
        {
          "id": 76,
          "answer": data[('data_verification')],
        },
        {
          "id": 77,
          "answer": data[('pec')],
        },
        {
          "id": 69,
          "answer": data[('ethics_manual')],
        },
        {
          "id": 70,
          "answer": data[('anti_corruption')],
          "description": data[('anti_corruption_description')]
        },
        {
          "id": 72,
          "answer": data[('good_faith')],
        },
        {
          "id": 73,
          "answer": data[('oath')],
        },
        {
          "id": 74,
          "answer": data[('third_parties')],
        },
        {
          "id": 78,
          "answer": data['poliza'],
        },
      ]
    }
    return formData;
  }

  setEditInitialForm(form: any, provider: any) {
    form.get('pais_id')?.valueChanges.subscribe(() => this.setDocumentValidators(form));

    form.get('name')?.setValue(provider?.name || '');
    form.get('document_type_id')?.setValue(provider?.f_document_type_id || 0);
    form.get('document')?.setValue(provider?.document || '');
    form.get('lugar_expedicion')?.setValue(provider?.expedition_place || '');
    form.get('nacionalidad')?.setValue(provider?.nationality || '');
    form.get('pais_id')?.setValue(provider?.country_id || 34);
    form.get('jurisdiccion_id')?.setValue(provider?.d_jurisdiction_id || 0);
    form.get('actividad_economica_id')?.setValue(provider?.f_vendor_economic_act_id || 0);
    form.get('industria_id')?.setValue(provider?.d_industry_id || 0);
    form.get('pep')?.setValue(provider?.pep ? "1" : "0");
    form.get('pep_description')?.setValue(provider?.pep_description || '');
    form.get('representante_legal')?.setValue(provider?.legal_representative_name || '');
    form.get('f_document_representative')?.setValue(provider?.legal_representative_document || '');
    form.get('city_representative')?.setValue(provider?.city_representative || '');
    form.get('responsible_responsibles_name')?.setValue(provider?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(provider?.responsible_responsibles_document || '');
    form.get('responsible_responsibles_email')?.setValue(provider?.responsible_responsibles_email || '');
    form.get('responsible_f_document_type_id')?.setValue(provider?.responsible_f_document_type_id || '');
    form.get('documento_identificacion')?.setValue(this.getDocumentLink(28));
    form.get('documento_identificacion_empresa')?.setValue(this.getDocumentLink(40));
    form.get('rut')?.setValue(this.getDocumentLink(35));
    form.get('rut_vendors')?.setValue(this.getDocumentLink(167));
    form.get('camara_comercio')?.setValue(this.getDocumentLink(44));
    form.get('documento_identificacion_vendors')?.setValue(this.getDocumentLink(168));
    form.get('actor_pep')?.setValue(provider?.actor_pep ? "1" : "0");
    form.get('lr_actor')?.setValue(provider?.lr_actor_value ? "1" : "0");
    form.get('actor_name')?.setValue(provider?.actor_name || '');
    form.get('actor_document')?.setValue(provider?.actor_document || '');
    form.get('manager_name')?.setValue(provider?.manager_name || '');
    form.get('manager_email')?.setValue(provider?.manager_email || '');
    form.get('manager_telephone')?.setValue(provider?.manager_telephone || '');
    form.get('actor_pep_description')?.setValue(provider?.actor_pep_description || '');
    form.get('verification_digit')?.setValue(provider?.verification_digit || null);
    form.get('documento_identificacion_actor')?.setValue(this.getDocumentLink(303));
    form.get('direccion')?.setValue(provider?.address || '');
    form.get('telefono')?.setValue(provider?.telephone || '');
    form.get('nombre_banco')?.setValue(provider?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(provider?.bank_key || '');
    form.get('type_cuenta_id')?.setValue(provider?.f_vendor_bank_account_type_id || '');
    form.get('type_regimen_id')?.setValue(provider?.f_contractor_regime_types_id || '');
    form.get('requires_external_staff')?.setValue(provider?.requires_external_staff ? "1" : "0");
    form.get('employees_number')?.setValue(provider?.employees_number || '');


    if (form.get('ciiu')) {
      provider?.ciiu?.forEach((ciiu: any) => {
        this.addCiiu(form, ciiu);
      });

      if (form.get('ciiu')?.value?.length == 0) {
        this.addCiiu(form, '');
      }
    }
  }

  addCiiu(form: FormGroup, ciiu: any) {
    const control = new FormControl(ciiu?.ciiu || '', [Validators.pattern('^[0-9]*$'), Validators.required]);
    (<FormArray>form.get('ciiu')).push(control);
  }

  setEditMxInitialForm(form: any, vendor: any, vendorAnswers: any[]) {
    form.get('name')?.setValue(vendor?.name || '');
    form.get('actividad_empresa')?.setValue(vendor?.vendor_economic || '');
    form.get('f_document_type_id')?.setValue(vendor?.f_document_type_id || 0);
    form.get('document')?.setValue(vendor?.document || '');
    form.get('telefono')?.setValue(vendor?.telephone || '');
    form.get('f_nacionalidad_representative')?.setValue(vendor?.city_representative|| '');
    form.get('direccion')?.setValue(vendor?.address || '');
    form.get('colonia')?.setValue(vendor?.population || '');
    form.get('pais_id')?.setValue(vendor?.country_id || 34);
    form.get('pais')?.setValue(vendor?.nationality || 0);
    form.get('jurisdiccion_id')?.setValue(vendor?.d_jurisdiction_id || 0);
    form.get('actividad_economica_id')?.setValue(vendor?.f_vendor_economic_act_id || 0);
    form.get('industria_id')?.setValue(vendor?.d_industry_id || 0);
    form.get('representante_legal')?.setValue(vendor?.legal_representative_name || '');
    form.get('f_document_representative')?.setValue(vendor?.legal_representative_document || '');
    form.get('alcaldia')?.setValue(vendor?.f_public_admin_mex_type_id || '');
    form.get('department')?.setValue(vendor?.department || '');
    form.get('artistic_name')?.setValue(vendor?.actor_artistic_name || '');
    form.get('ciudad')?.setValue(vendor?.city || '');
    form.get('city_representative')?.setValue(vendor?.city_representative || '');
    form.get('responsible_responsibles_name')?.setValue(vendor?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(vendor?.responsible_responsibles_document || '');
    form.get('responsible_responsibles_email')?.setValue(vendor?.responsible_responsibles_email || '');
    form.get('responsible_f_document_type_id')?.setValue(vendor?.responsible_f_document_type_id || '');
    form.get('persona_servicio_email_description')?.setValue(vendor?.responsible_responsibles_email || '');
    form.get('responsible_responsibles_telephone')?.setValue(vendor?.responsible_telephone || '');
    form.get('documento_identificacion')?.setValue(this.getDocumentLink(28));
    form.get('documento_identificacion_empresa')?.setValue(this.getDocumentLink(40));
    form.get('codigo_postal')?.setValue(vendor?.info_add_address || '');
    form.get('nombre_banco')?.setValue(vendor?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(vendor?.bank_key || '');
    form.get('cuenta_clabe')?.setValue(vendor?.account_clabe || '');
    form.get('regimen_fiscal')?.setValue(vendor?.f_contractor_regime_types_id || '');
    form.get('persona_servicio_name_description')?.setValue(vendor?.responsible_responsibles_name || '');
    form.get('responsible_responsibles_document')?.setValue(vendor?.responsible_responsibles_document || '');
    form.get('persona_servicio_nacionalidad_description')?.setValue(vendor?.responsible_city || '');
    form.get('fecha_nacimiento')?.setValue(vendor?.birth_date || '');
    form.get('genero_id')?.setValue(vendor?.genders_id || 0);
    form.get('nombre_emergencia')?.setValue(vendor?.emergency_contact_name || '');
    form.get('telefono_emergencia')?.setValue(vendor?.emergency_contact_telephone || '');
    form.get('grupo_sanguineo')?.setValue(vendor?.blood_type_id || '');
    form.get('profesion')?.setValue(vendor?.occupation || '');
    form.get('manager_email')?.setValue(vendor?.manager_email || '');
    form.get('manager_telephone')?.setValue(vendor?.manager_telephone || '');
    form.get('manager_name')?.setValue(vendor?.manager_name || '');
    form.get('manager_document')?.setValue(vendor?.manager_document || '');
    form.get('company_name')?.setValue(vendor?.company_name || '');
    form.get('company_document')?.setValue(vendor?.company_document || '');
    form.get('actividad_empresa')?.setValue(vendor?.vendor_economic || '');
    form.get('has_manager')?.setValue((vendor?.manager_name || vendor?.manager_document || vendor?.manager_telephone || vendor?.manager_email) ? '1' : '0');
    // yes or not
    form.get('repse_register_description')?.setValue(this.getDescription(105, vendorAnswers));
    form.get('repse')?.setValue(this.getQuestionData(105, vendorAnswers, 'repse', form));
    form.get('lr_actor')?.setValue(this.getQuestionData(50, vendorAnswers, 'lr_actor', form));
    form.get('fecha_nacimiento')?.setValue(vendor?.birth_date || '');
    form.get('alergia')?.setValue(this.getQuestionData(24, vendorAnswers, 'alergia', form));
    form.get('alergia_description')?.setValue(this.getDescription(24, vendorAnswers));
    form.get('restriccion')?.setValue(this.getQuestionData(23, vendorAnswers, 'restriccion', form));
    form.get('restriccion_description')?.setValue(this.getDescription(23, vendorAnswers));
    form.get('madre_padre')?.setValue(this.getQuestionData(12, vendorAnswers, 'madre_padre', form));
    form.get('madre_padre_description')?.setValue(this.getDescription(12, vendorAnswers));
    form.get('vinculo')?.setValue(this.getQuestionData(18, vendorAnswers, 'vinculo', form));
    form.get('vinculo_description')?.setValue(this.getDescription(18, vendorAnswers));
    form.get('relacion')?.setValue(this.getQuestionData(20, vendorAnswers, 'relacion', form));
    form.get('relacion_description')?.setValue(this.getDescription(20, vendorAnswers));
    form.get('informacion_futura')?.setValue(this.getQuestionData(14, vendorAnswers, 'informacion_futura', form));
    form.get('datos_otros')?.setValue(this.getQuestionData(16, vendorAnswers, 'datos_otros', form));
    form.get('permisos_entidades')?.setValue(this.getQuestionData(15, vendorAnswers, 'permisos_entidades', form));
    form.get('permisos_eventos')?.setValue(this.getQuestionData(17, vendorAnswers, 'permisos_eventos', form));
    form.get('autorizacion_media')?.setValue(this.getQuestionData(26, vendorAnswers));
    form.get('verificacion_datos')?.setValue(this.getQuestionData(104, vendorAnswers));
  }

  setEditVinculationForm(form: any, serviceType: any, serviceTypeAnswers: any[]) {
    form.get('fm_request_po_id')?.setValue(serviceType?.id || '');
    form.get('artistic_name')?.setValue(serviceType?.actor_artistic_name || '');
    form.get('fecha_nacimiento')?.setValue(serviceType?.birth_date || '');
    form.get('nacionalidad')?.setValue(serviceType?.nationality || '');
    form.get('genero_id')?.setValue(serviceType?.genders_id || 0);
    form.get('direccion')?.setValue(serviceType?.address || '');
    form.get('ciudad')?.setValue(serviceType?.city || '');
    form.get('telefono')?.setValue(serviceType?.telephone || '');
    form.get('eps')?.setValue(serviceType?.eps || '');
    form.get('pension')?.setValue(serviceType?.afp || '');
    form.get('madre_padre_description')?.setValue(serviceType?.children_number || '');
    form.get('profesion')?.setValue(serviceType?.occupation || '');
    form.get('nombre_banco')?.setValue(serviceType?.bank_details?.bank_name || '');
    form.get('numero_cuenta')?.setValue(serviceType?.bank_details?.account_number || '');
    form.get('pago_medio_id')?.setValue(serviceType?.f_payment_regime_methods_id || '');
    form.get('grupo_sanguineo')?.setValue(serviceType?.blood_type_id || '');
    form.get('arl_id')?.setValue(serviceType?.occupational_risk_administrators_id || '');
    form.get('type_regimen_id')?.setValue(serviceType?.f_contractor_regime_types_id || '');
    form.get('nombre_emergencia')?.setValue(serviceType?.emergency_contact_name || '');
    form.get('telefono_emergencia')?.setValue(serviceType?.emergency_contact_telephone || '');
    form.get('eps_id')?.setValue(serviceType?.f_type_contributing_epses_id || '');
    form.get('type_cuenta_id')?.setValue(serviceType?.bank_details?.account_type || '');
    //yes or no
    form.get('madre_padre')?.setValue(this.getQuestionData(12, serviceTypeAnswers));
    form.get('mascota')?.setValue(this.getQuestionData(13, serviceTypeAnswers));
    form.get('informacion_futura')?.setValue(this.getQuestionData(14, serviceTypeAnswers));
    form.get('permisos_entidades')?.setValue(this.getQuestionData(15, serviceTypeAnswers));
    form.get('datos_otros')?.setValue(this.getQuestionData(16, serviceTypeAnswers));
    form.get('permisos_eventos')?.setValue(this.getQuestionData(17, serviceTypeAnswers));
    form.get('poliza')?.setValue(this.getQuestionData(78, serviceTypeAnswers, 'poliza', form));
    form.get('vinculo')?.setValue(this.getQuestionData(18, serviceTypeAnswers, 'vinculo', form));
    form.get('vinculo_description')?.setValue(this.getDescription(18, serviceTypeAnswers));
    form.get('relacion')?.setValue(this.getQuestionData(20, serviceTypeAnswers, 'relacion', form));
    form.get('relacion_description')?.setValue(this.getDescription(20, serviceTypeAnswers));
    form.get('requirements')?.setValue(this.getQuestionData(75, serviceTypeAnswers, 'requirements', form));
    form.get('data_verification')?.setValue(this.getQuestionData(76, serviceTypeAnswers, 'data_verification', form));
    form.get('pec')?.setValue(this.getQuestionData(77, serviceTypeAnswers, 'pec', form));
    form.get('anti_corruption')?.setValue(this.getQuestionData(70, serviceTypeAnswers, 'anti_corruption', form));
    form.get('anti_corruption_description')?.setValue(this.getDescription(70, serviceTypeAnswers));
    form.get('ethics_manual')?.setValue(this.getQuestionData(69, serviceTypeAnswers, 'ethics_manual', form));
    form.get('good_faith')?.setValue(this.getQuestionData(72, serviceTypeAnswers, 'good_faith', form));
    form.get('oath')?.setValue(this.getQuestionData(73, serviceTypeAnswers, 'oath', form));
    form.get('third_parties')?.setValue(this.getQuestionData(74, serviceTypeAnswers, 'third_parties', form));
    form.get('restriccion')?.setValue(this.getQuestionData(23, serviceTypeAnswers, 'restriccion', form));
    form.get('restriccion_description')?.setValue(this.getDescription(23, serviceTypeAnswers));
    form.get('alergia')?.setValue(this.getQuestionData(24, serviceTypeAnswers, 'alergia', form));
    form.get('alergia_description')?.setValue(this.getDescription(24, serviceTypeAnswers));
    form.get('autorizacion_media')?.setValue(this.getQuestionData(26, serviceTypeAnswers));
    form.get('payroll')?.setValue(this.getQuestionData(27, serviceTypeAnswers, 'payroll', form));
    form.get('payroll_description')?.setValue(this.getDescription(27, serviceTypeAnswers));
    form.get('informacion_futura_actor')?.setValue(this.getQuestionData(58, serviceTypeAnswers, 'informacion_futura_actor', form));
    form.get('autorizacion_media_actor')?.setValue(this.getQuestionData(59, serviceTypeAnswers, 'autorizacion_media_actor', form));
    form.get('permisos_entidades_actor')?.setValue(this.getQuestionData(60, serviceTypeAnswers, 'permisos_entidades_actor', form));
    form.get('datos_otros_actor')?.setValue(this.getQuestionData(61, serviceTypeAnswers, 'datos_otros_actor', form));
    form.get('permisos_eventos_actor')?.setValue(this.getQuestionData(62, serviceTypeAnswers, 'permisos_eventos_actor', form));
    form.get('vinculo_actor')?.setValue(this.getQuestionData(63, serviceTypeAnswers, 'vinculo_actor', form));
    form.get('vinculo_description_actor')?.setValue(this.getDescription(63, serviceTypeAnswers));
    form.get('relacion_actor')?.setValue(this.getQuestionData(65, serviceTypeAnswers, 'vinculo_actor', form));
    form.get('relacion_description_actor')?.setValue(this.getDescription(65, serviceTypeAnswers));
  }

  getQuestionData(id: any, answers: any[], controlName?: string, form?: any) {
    const answer = answers.find((an: any) => an.id == id);

    if (!answer) return null;

    if (answer.answer === true && controlName) {
      form.get(`${controlName}_description`)?.setValidators(Validators.required);
    }
    else if (answer.answer !== true && controlName){
      form.get(`${controlName}_description`)?.removeValidators(Validators.required);
    }

    if (answer) return answer.answer === true ? "1" : (answer.answer === false ? "0" : null);
    else return null;
  }

  getDescription(id: any, answers: any[]) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer) return answer.description ? answer.description : null;
    else return null;
  }

  getDocumentLink(id: any) {
    let documentsList = this._cS.getDocumentsList();
    return documentsList.find((dl: any) => dl.id == id);
  }

  normalizeString(strAccents:string) {
    return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  openSnackBar(message: string, action: string = 'X', duration: number = 10000) {
		this._snackBar.open(message, action, {
			duration: duration,
		});
  }

  setDocumentValidators(form: FormGroup) {
    if (form.get('pais_id')?.value == Countries.Mex) {
      form.get('document')?.setValidators([Validators.required, withoutSpacesPoints(), lettersAndNumbersValidator()]);
    } else {
      form.get('document')?.setValidators([Validators.required, withoutSpacesPoints(), onlyNumbersValidator()]);
    }
  }

  constructor(private _cS: VendorService, private _snackBar: MatSnackBar) { }
}
