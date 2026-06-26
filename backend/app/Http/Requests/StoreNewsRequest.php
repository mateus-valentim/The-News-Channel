<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreNewsRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('news', 'title')->ignore($this->route('user'))
            ],

            'content_json' => [
                'required',
                'json',
            ],

            'category_id' => [
                'required',
                'integer',
                'exists:categories,id',
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'user_id' => [
                'required',
                'integer',
                'exists:users,id',
            ],

            'tags' => [
                'nullable',
                'array'
            ],

            'tags.*' => [
                'integer',
                'exists:tags,id'
            ],
        ];
    }

    public function messages(): array
    {
        return [

            'title.required' => 'O título da notícia é obrigatório.',
            'title.min' => 'O título deve possuir no mínimo :min caracteres.',
            'title.max' => 'O título deve possuir no máximo :max caracteres.',
            'title.unique' => 'O título deve possuir um nome único',

            'content_json.required' => 'O conteúdo da notícia é obrigatório.',
            'content_json.json' => 'O conteúdo JSON informado é inválido.',


            'category_id.required' => 'É obrigatório selecionar uma categoria.',
            'category_id.exists' => 'A categoria selecionada não existe.',

            'cover_image.image' => 'O arquivo enviado deve ser uma imagem.',
            'cover_image.mimes' => 'A imagem deve ser JPG, JPEG, PNG ou WEBP.',
            'cover_image.max' => 'A imagem deve possuir no máximo 2 MB.',

            'user_id.required' => 'É obrigatório informar o autor da notícia.',
            'user_id.integer' => 'O autor informado é inválido.',
            'user_id.exists' => 'O usuário informado não existe.',

            'tags.array' => 'As tags devem ser enviadas em formato de lista.',
            'tags.*.integer' => 'Cada tag deve possuir um identificador válido.',
            'tags.*.exists' => 'Uma ou mais tags selecionadas não existem.',



        ];
    }
}
