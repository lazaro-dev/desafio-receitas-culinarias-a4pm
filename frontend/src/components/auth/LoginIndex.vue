<script setup lang="ts">
import FormGroup from "@/components/shared/form/FormGroup.vue";
import FormBase from "@/components/shared/form/FormBase.vue";
import InputText from "@/components/shared/input/InputText.vue";
import InputPassword from "@/components/shared/input/InputPassword.vue";
import ItemFormGroup from "@/components/shared/form/ItemFormGroup.vue";
import CardSimple from "@/components/shared/card/CardSimple.vue";
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import { useAuth } from "@/composables/auth/useAuth";
import { ref } from "vue";

interface FormLogin {
    login: string;
    senha: string;
}

const form = ref<FormLogin>({
    login: "",
    senha: "",
});

const { loading, signIn } = useAuth();

const signInLocal = () => {
    signIn({
        login: form.value.login,
        senha: form.value.senha,
    });
};
</script>
<template>
    <div class="flex justify-center w-full">
        <CardSimple>
            <FormGroup title="Entrar">
                <FormBase @submit.prevent="signInLocal" class="flex flex-col gap-4">
                    <ItemFormGroup>
                        <InputText
                            v-model="form.login"
                            label="Usuário"
                            placeholder="carla_silva"
                        />
                    </ItemFormGroup>
                    <ItemFormGroup>
                        <InputPassword
                            v-model="form.senha"
                            label="Senha"
                            placeholder="******"
                        />
                    </ItemFormGroup>

                    <ButtonBase
                        type="submit"
                        class="py-1 px-2"
                        :color-type="'bg-orange-600 text-white hover:bg-orange-700'"
                        :disabled="loading"
                    >
                        <span v-if="!loading">Entrar</span>
                        <span v-else>Entrando...</span>
                    </ButtonBase>
                    <div class="mt-6">
                        <span class="flex justify-center gap-1 px-2">
                            Não tem uma conta?
                            <router-link
                                to="/registre-se"
                                class="font-medium text-orange-600 hover:text-orange-500"
                            >
                                Registre-se
                            </router-link>
                        </span>
                    </div>
                </FormBase>
            </FormGroup>
        </CardSimple>
    </div>
</template>

<style scoped></style>
