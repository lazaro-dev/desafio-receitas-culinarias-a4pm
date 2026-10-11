<script setup lang="ts">
import FormGroup from "@/components/shared/form/FormGroup.vue";
import FormBase from "@/components/shared/form/FormBase.vue";
import InputText from "@/components/shared/input/InputText.vue";
import InputPassword from "@/components/shared/input/InputPassword.vue";
import ItemFormGroup from "@/components/shared/form/ItemFormGroup.vue";
import CardSimple from "@/components/shared/card/CardSimple.vue";
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import { ref } from "vue";

interface ValueForm<T> {
    value: T;
    error: string;
}

interface FormLogin {
    nome: ValueForm<string>;
    login: ValueForm<string>;
    senha: ValueForm<string>;
    confirmar_senha: ValueForm<string>;
}

const form = ref<FormLogin>({
    nome: { value: "", error: "" },
    login: { value: "", error: "" },
    senha: { value: "", error: "" },
    confirmar_senha: { value: "", error: "" },
});
const loadingRegisterSubmit = ref(false);

const resetForm = () => {
    form.value = {
        nome: { value: "", error: "" },
        login: { value: "", error: "" },
        senha: { value: "", error: "" },
        confirmar_senha: { value: "", error: "" },
    };
};

const register = () => {
    let formValid = true;
    const payload = {
        nome: !form.value.nome.value ? undefined : form.value.nome.value,
        login: form.value.login.value,
        senha: form.value.senha.value,
    };

    if (!payload.login) {
        form.value.login.error = "O usuário deve ser informado.";
        formValid = false;
    }

    if (!payload.senha) {
        form.value.senha.error = "A senha deve ser informada.";
        formValid = false;
    }

    if (payload.senha !== form.value.confirmar_senha.value) {
        form.value.confirmar_senha.error = "As senhas devem ser iguais.";
        formValid = false;
    }

    if (!formValid) {
        return;
    }

    // if (!payload.nome) {
    //     delete payload.nome;
    // }

    loadingRegisterSubmit.value = true;

    resetForm();
    console.log(payload);
};
</script>
<template>
    <div class="flex justify-center w-full">
        <CardSimple class="sm:w-full sm:max-w-md lg:min-w-100">
            <FormGroup title="Criar Conta">
                <FormBase @submit.prevent="register" class="flex flex-col gap-4">
                    <ItemFormGroup>
                        <InputText
                            v-model="form.nome.value"
                            label="Nome"
                            placeholder="Carla da Silva"
                            :error="form.nome.error"
                        />
                    </ItemFormGroup>

                    <ItemFormGroup>
                        <InputText
                            v-model="form.login.value"
                            label="Usuário"
                            placeholder="carla_silva"
                            :error="form.login.error"
                        />
                    </ItemFormGroup>

                    <ItemFormGroup>
                        <InputPassword
                            v-model="form.senha.value"
                            label="Senha"
                            placeholder="******"
                            :error="form.senha.error"
                        />
                    </ItemFormGroup>

                    <ItemFormGroup>
                        <InputPassword
                            v-model="form.confirmar_senha.value"
                            label="Confirmar Senha"
                            placeholder="******"
                            :error="form.confirmar_senha.error"
                        />
                    </ItemFormGroup>

                    <ButtonBase
                        type="submit"
                        class="py-1 px-2"
                        :color-type="'bg-orange-600 text-white hover:bg-orange-700'"
                        :disabled="loadingRegisterSubmit"
                    >
                        <span v-if="!loadingRegisterSubmit">Criar</span>
                        <span v-else>Criando...</span>
                    </ButtonBase>
                    <div class="mt-6">
                        <span class="flex justify-center gap-1 px-2">
                            Já tem conta?
                            <router-link
                                to="/entrar"
                                class="font-medium text-orange-600 hover:text-orange-500"
                            >
                                Login
                            </router-link>
                        </span>
                    </div>
                </FormBase>
            </FormGroup>
        </CardSimple>
    </div>
</template>

<style scoped></style>
