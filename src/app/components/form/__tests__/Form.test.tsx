
import { render, screen } from '@testing-library/react';
import useDistricts from '@/app/hooks/useDistrict';
import { mockDistricts } from '@/app/hooks/__mocks__/districtMock';
import { errors, formData, mockErrors } from '../__mocks__/formMock';
import Form from '../Form';
import { AppProvider } from '@/app/context/app-context';

jest.mock('@/app/hooks/useDistrict', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('@/app/context/app-context', () => ({
    useGlobalAppState: jest.fn(() => ({
        modal: { isVisible: true },

    })),
    useGlobalAppDispatch: jest.fn(() => jest.fn()),

}));

jest.unmock('@/app/context/app-context');

const onSubmit = jest.fn();
const onChange = jest.fn();
const onCloseModal = jest.fn();

describe('Form Component', () => {
    beforeEach(() => {

        (useDistricts as jest.Mock).mockReturnValue({
            districts: mockDistricts.districts,
            loading: false,
            error: null,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should renders form correctly', () => {
        render(
            <Form
                formData={formData}
                errors={errors}
                isModalVisible={false}
                onSubmit={onSubmit}
                onChange={onChange}
                onCloseModal={onCloseModal}
            />
        );

        expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/distrito/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/referencia/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/celular/i)).toBeInTheDocument();
        expect(screen.getByText(/comprar/i)).toBeInTheDocument();
    });

    it('Should display loading message when districts are loading', () => {
        (useDistricts as jest.Mock).mockReturnValueOnce({
            districts: [],
            loading: true,
            error: null,
        });

        render(
            <Form
                formData={formData}
                errors={errors}
                isModalVisible={false}
                onSubmit={onSubmit}
                onChange={onChange}
                onCloseModal={onCloseModal}
            />
        );

        expect(screen.getByText(/loading districts.../i)).toBeInTheDocument();
    });

    it('Should display error message for fields with validation errors', () => {
        const mockErrorsWithData = {
            name: 'Name is required',
            lastname: '',
            district: '',
            address: 'Address is required',
            reference: '',
            phone: '',
        };

        render(
            <Form
                formData={formData}
                errors={mockErrorsWithData}
                isModalVisible={false}
                onSubmit={onSubmit}
                onChange={onChange}
                onCloseModal={onCloseModal}
            />
        );

        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
    });


    it('Should display error message when districts fail to load', () => {
        (useDistricts as jest.Mock).mockReturnValueOnce({
            districts: [],
            loading: false,
            error: 'Error al cargar distritos',
        });

        render(
            <Form
                formData={formData}
                errors={errors}
                isModalVisible={false}
                onSubmit={onSubmit}
                onChange={onChange}
                onCloseModal={onCloseModal}
            />
        );

        expect(screen.getByText(/Error al cargar distritos/i)).toBeInTheDocument();
    });

    it('Should display error messages when form fields have errors', () => {

        render(
            <Form
                formData={formData}
                errors={mockErrors}
                isModalVisible={false}
                onSubmit={jest.fn()}
                onChange={jest.fn()}
                onCloseModal={jest.fn()}
            />
        );

        expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
        expect(screen.getByText('El apellido es requerido')).toBeInTheDocument();
        expect(screen.getByText('El distrito es requerido')).toBeInTheDocument();
        expect(screen.getByText('La dirección es requerida')).toBeInTheDocument();
        expect(screen.getByText('La referencia es requerida')).toBeInTheDocument();
        expect(screen.getByText('El teléfono es requerido')).toBeInTheDocument();
    });

    it("Should display modal when isModalVisible is true", () => {
        render(
            <AppProvider>
                <Form
                    formData={formData}
                    errors={errors}
                    isModalVisible={true}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    onCloseModal={onCloseModal}
                />
            </AppProvider>
        );

        expect(screen.getByText((content) => content.includes('Su pedido se registró con éxito.'))).toBeInTheDocument();

    });

    it('Should not display modal when isModalVisible is false', () => {
        render(
            <Form
                formData={formData}
                errors={errors}
                isModalVisible={false}
                onSubmit={onSubmit}
                onChange={onChange}
                onCloseModal={onCloseModal}
            />
        );

        expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
    });

});
