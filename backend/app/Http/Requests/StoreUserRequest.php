<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user)
            ],

            'password' => [
                $this->isMethod('POST') ? 'required' : 'nullable',
                'string',
                'min:8'
            ],

            'profile_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }

    public function messages(): array{
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve ser um texto válido.',
            'name.max' => 'O nome deve ter no máximo :max caracteres.',

            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Informe um email válido.',
            'email.max' => 'O email deve ter no máximo :max caracteres.',
            'email.unique' => 'Este email já está cadastrado.',

            'password.required' => 'A senha é obrigatória.',
            'password.string' => 'A senha deve ser um texto válido.',
            'password.min' => 'A senha deve possuir no mínimo :min caracteres.',

            'profile_image.image' => 'O arquivo enviado deve ser uma imagem.',
            'profile_image.mimes' => 'A imagem deve ser JPG, JPEG, PNG ou WEBP.',
            'profile_image.max' => 'A imagem deve possuir no máximo 2 MB.',

        ];
    }
}
