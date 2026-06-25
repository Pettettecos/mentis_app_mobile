import { useLocalSearchParams } from 'expo-router';
import { EmployeeQuestionnaireScreen } from '@/screens/EmployeeScreens/EmployeeQuestionnaireScreen';

export default function QuestionnaireAnswerPage() {
  const { id, submissionId } = useLocalSearchParams<{
    id: string;
    submissionId?: string;
  }>();

  return (
    <EmployeeQuestionnaireScreen
      questionnaireId={id}
      submissionId={submissionId}
    />
  );
}
