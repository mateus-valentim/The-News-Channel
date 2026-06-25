<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTagRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'min:2', Rule::unique('tags', 'name')->ignore($this->route('tag'))],
        ];
    }

    public function messages(): array
    {

        return [
            'name.required' => "O nome deverá ser preenchido.",
            'name.string' => "O nome deverá ser um texto.",
            'name.min' =>  "O nome deverá conter no mímimo :min caracteres.",
            'name.max' => "O nome deverá conter no máximo :max caracteres.",
            'name.unique' => "Já existe uma categoria cadastrada com este nome."
        ];
    }
}
