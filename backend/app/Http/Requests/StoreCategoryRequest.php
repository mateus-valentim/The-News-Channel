<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:2', 'max:255', Rule::unique('categories', 'name')->ignore($this->route('category'))],
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
